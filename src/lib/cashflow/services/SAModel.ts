/* eslint-disable @typescript-eslint/no-this-alias */
import { SAType } from './SAType'
import { useEventManager, type Events } from '@/composables/useEventManager'

// Custom utility functions to replace lodash
const utils = {
  keys: Object.keys,
  assign: Object.assign,
  forEach: <T>(obj: T[] | { [key: string]: any }, iteratee: (value: any, key: any) => void) => {
    if (Array.isArray(obj)) {
      obj.forEach((value, index) => iteratee(value, index));
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => iteratee(obj[key], key));
    }
  },
  isObject: (value: any): value is object => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  clone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return [...obj] as T;
    return { ...obj } as T;
  },
  isFunction: (value: any): value is (...args: any[]) => any => {
    return typeof value === 'function';
  }
};
// --- End Placeholder Declarations ---

/**
 * Represents a constructor function.
 */
export type AnyConstructor = new (...args: any[]) => any

export interface SetterHookOptions {
  silent?: boolean
  force?: string
  // Add any other options that might be passed
}

export interface DefaultPropertyDescriptor {
  value: any
  type?: any // This could be a constructor or a string identifier for SAType
}

export type DefaultsDefinition = {
  [key: string]: any | DefaultPropertyDescriptor
}

let currModelID = 0
function getCurrModelID(): number {
  return currModelID++
}

// Helper function to build accessors (kept for conceptual understanding,
// but in TypeScript, explicit getters/setters in the class are preferred for type safety)
function buildAccessorsForKey(key: string): { [methodName: string]: (...args: any[]) => any } {
  const capitalized = key.replace(/^./, (ch) => ch.toUpperCase())
  const methods: { [methodName: string]: (...args: any[]) => any } = {}

  methods[`get${capitalized}`] = function (this: SAModel<any>) {
    return this.get(key)
  }
  methods[`set${capitalized}`] = function (
    this: SAModel<any>,
    newValue: any,
    opts?: SetterHookOptions,
  ) {
    return this.set(key, newValue, opts)
  }
  return methods
}

function addAccessorsToPrototype(
  proto: any,
  defaults: DefaultsDefinition | undefined,
): void {
  if (!defaults) return
  const dataKeys = utils.keys(defaults)
  const accessors = dataKeys.reduce(
    (acc, key) => utils.assign(acc, buildAccessorsForKey(key)),
    {},
  )

  utils.forEach(accessors, (method, methodName) => {
    if (!(methodName in proto)) {
      proto[methodName] = method
    }
  })
}

export class SAModel<TData extends object> {
  private _eventBus: ReturnType<typeof useEventManager>
  protected _data: TData
  private _propTypes: { [K in keyof TData]?: any } // Store type information for coercion
  public readonly modelID = 0

  // These would be defined in subclasses
  protected setterHooks: {
    [K in keyof TData]?: (value: TData[K], opts: SetterHookOptions) => void
  } = {}
  protected defaults: DefaultsDefinition | undefined = undefined // To be overridden by subclasses

  // Statically store all defaults, including those from parent classes
  static _allDefaults: DefaultsDefinition = {}
  static ParentClass: AnyConstructor | null = null // Use AnyConstructor here

  constructor(initialData?: Partial<TData>) {
    Object.defineProperty(this, 'modelID', {
      enumerable: false,
      writable: false,
      configurable: false,
      value: getCurrModelID(),
    })

    this._eventBus = useEventManager()
    this.setterHooks = this.setterHooks || {} // Ensure setterHooks is initialized

    this._data = {} as TData
    this._propTypes = {}
    this._applyDefaults()

    if (initialData) {
      utils.forEach(
        initialData as { [key: string]: any },
        (val: any, key: string) => {
          this.set(key as keyof TData, val, { silent: true })
        },
      )
    }
  }

  private _applyDefaults(): void {
    const allDefaults = (this.constructor as typeof SAModel)._allDefaults
    const data = this._data as { [key: string]: any } // Internal mutable access
    const propTypes = this._propTypes as { [key: string]: any }

    utils.forEach(allDefaults, (desc, prop: string) => {
      let valueDesc: DefaultPropertyDescriptor
      if (!utils.isObject(desc) || !('value' in desc)) {
        // Handle simple value defaults
        valueDesc = { value: desc }
      } else {
        valueDesc = desc as DefaultPropertyDescriptor
      }

      let value = valueDesc.value
      const type = valueDesc.type

      if (type) {
        propTypes[prop] = type
        value = SAType.coerce(type, value)
      }
      data[prop] = value
    })
  }

  /**
   * Getter for arbitrary properties.
   */
  public get<K extends keyof TData>(key: K): TData[K] {
    return this._data[key]
  }

  /**
   * Returns a shallow copy of the raw data held by this model.
   */
  public asRawData(): TData {
    return this._data ? utils.clone(this._data) : ({} as TData)
  }

  /**
   * Setter for arbitrary properties.
   */
  public set<K extends keyof TData>(
    key: K,
    value: TData[K],
    opts?: SetterHookOptions,
  ): this {
    opts = opts || {}
    const prev = this._data[key]
    let coercedValue = value

    const propType = this._propTypes[key]
    if (propType) {
      coercedValue = SAType.coerce(propType, value)
    }

    if (prev !== coercedValue) {
      ;(this._data as any)[key] = coercedValue // Internal mutable access

      if (!opts.silent) {
        const evName = `change:${String(key)}` as keyof Events
        const evData = {
          value: coercedValue,
          prev: prev,
          source: this,
        }
        this.trigger(evName, evData)
      }

      const hook = this.setterHooks[key]
      if (utils.isFunction(hook)) {
        hook.call(this, coercedValue, opts)
      }
    }
    return this
  }

  public increment<K extends keyof TData>(
    key: K,
    amount: number,
  ): number | TData[K] {
    const current = this.get(key)
    if (typeof current === 'number') {
      const newValue = current + amount
      this.set(key, newValue as TData[K])
      return newValue
    }
    console.warn(
      `SAModel.increment: Property '${String(key)}' is not a number.`,
    )
    return current
  }

  public decrement<K extends keyof TData>(
    key: K,
    amount: number,
  ): number | TData[K] {
    const current = this.get(key)
    if (typeof current === 'number') {
      const newValue = current - amount
      this.set(key, newValue as TData[K])
      return newValue
    }
    console.warn(
      `SAModel.decrement: Property '${String(key)}' is not a number.`,
    )
    return current
  }

  public on(
    eventName: string,
    handler: (...args: any[]) => void,
    context?: any,
  ): any {
    return this._eventBus.on(eventName as keyof Events, handler as (payload: any) => void, context)
  }

  public off(eventName: string, handler?: (...args: any[]) => void): any {
    return this._eventBus.off(eventName as keyof Events, handler as (payload: any) => void)
  }

  public one(
    eventName: string,
    handler: (...args: any[]) => void,
    context?: any,
  ): any {
    const onceHandler = (...args: any[]) => {
      handler.apply(context, args)
      this.off(eventName, onceHandler)
    }
    return this.on(eventName, onceHandler, context)
  }

  public trigger(eventName: string, eventData?: any): any {
    const data = eventData || {}
    data.source = this
    return this._eventBus.emit(eventName as keyof Events, data as any)
  }

  public clone(): this {
    const Ctor = this.constructor as typeof SAModel
    return new Ctor(this._data as Partial<TData>) as this
  }

  public toJSON(): TData {
    return this._data
  }

  static extend<
    TParentData extends object,
    SubclassDefaults extends DefaultsDefinition,
    SubclassInstanceData extends object = {
      [K in keyof SubclassDefaults]: SubclassDefaults[K] extends DefaultPropertyDescriptor
        ? SubclassDefaults[K]['value']
        : SubclassDefaults[K]
    }
  >(
    this: new (initialData?: Partial<TParentData>) => SAModel<TParentData>,
    protoProps: {
      defaults?: SubclassDefaults
      ctor?: (...args: any[]) => void
    } & ThisType<SAModel<SubclassInstanceData> & any> &
      Omit<any, 'defaults' | 'ctor'>,
  ): {
    new (
      initialData?: Partial<SubclassInstanceData>,
    ): SAModel<SubclassInstanceData> & any
    extend: (typeof SAModel)['extend']
    getAllDefaults: () => DefaultsDefinition
    getModelID: () => number
    _allDefaults: DefaultsDefinition
    ParentClass: AnyConstructor | null
  } {
    const Parent = this

    const Subclass = function SAModelSubclassInstance(
      this: SAModel<SubclassInstanceData>,
      initialData?: any,
      ...args: any[]
    ) {
      SAModel.prototype.constructor.call(this, initialData)
      if (protoProps.ctor) {
        protoProps.ctor.apply(this, [initialData, ...args])
      }
    } as any

    Object.setPrototypeOf(Subclass, Parent)
    Subclass.prototype = Object.create(Parent.prototype)
    Subclass.prototype.constructor = Subclass

    utils.assign(Subclass.prototype, protoProps)
    ;(Subclass as any).ParentClass = Parent
    ;(Subclass as any)._allDefaults = (Subclass as any).getAllDefaults.call(
      Subclass,
    )

    if (protoProps.defaults) {
      addAccessorsToPrototype(Subclass.prototype, protoProps.defaults)
    }
    return Subclass
  }

  static getAllDefaults(): DefaultsDefinition {
    let parentDefaults: DefaultsDefinition = {}
    const ParentClass = this.ParentClass

    if (ParentClass) {
      parentDefaults =
        (ParentClass as typeof SAModel)._allDefaults ||
        (ParentClass as typeof SAModel).getAllDefaults()
      parentDefaults = utils.clone(parentDefaults)
    }

    const myDefaults = (this.prototype as any).defaults as
      | DefaultsDefinition
      | undefined
    return myDefaults
      ? utils.assign({}, parentDefaults, myDefaults)
      : parentDefaults
  }

  static getModelID(): number {
    return getCurrModelID()
  }
}

;(SAModel as any)._allDefaults = (SAModel as any).getAllDefaults()
