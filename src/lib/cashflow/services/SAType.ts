/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// Custom utility functions to replace lodash
const utils = {
  isString: (value: any): value is string => typeof value === 'string',
  isFunction: (value: any): boolean => typeof value === 'function',
  isObject: (value: any): value is object => value !== null && typeof value === 'object',
  cloneDeep: <T>(value: T): T => {
    if (value === null || typeof value !== 'object') return value;
    if (value instanceof Date) return new Date(value.getTime()) as unknown as T;
    if (value instanceof Array) return value.map(item => utils.cloneDeep(item)) as unknown as T;
    if (typeof value === 'object') {
      const clonedObj = {} as T;
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          clonedObj[key] = utils.cloneDeep(value[key]);
        }
      }
      return clonedObj;
    }
    return value;
  },
  forOwn: <T>(obj: T, iteratee: (value: any, key: string) => void): void => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          iteratee(obj[key], key);
        }
      }
    }
  }
};

// Assuming 'cc.Class' (if needed for deepFreeze context)
// is globally available or imported.
// You'll need to ensure type definitions for this exist if it's not part of your Cocos typings.

// --- Placeholder Declarations ---
/**
 * Represents a constructor function.
 */
type AnyConstructor = new (...args: any[]) => any

declare let cc: {
  /**
   * Placeholder for the Cocos Class object.
   * In a real Cocos environment, this would be a more detailed class definition.
   */
  Class: AnyConstructor | any // Allow 'any' for flexibility if cc.Class is not always a constructor in some contexts
}
// --- End Placeholder Declarations ---

// Define a type for the coerce function
type CoerceFunction<T = any> = (value: any) => T

// Define the structure for an entry in the typeRegistry
interface TypeRegistryEntry<T = any> {
  coerce: CoerceFunction<T>
}

// Define the overall structure of the typeRegistry
interface TypeRegistry {
  int: TypeRegistryEntry<number>
  number: TypeRegistryEntry<number>
  string: TypeRegistryEntry<string>
  boolean: TypeRegistryEntry<boolean>
  array: TypeRegistryEntry<any[]>
  frozenArray: TypeRegistryEntry<ReadonlyArray<any>>
  object: TypeRegistryEntry<object>
  frozenObject: TypeRegistryEntry<Readonly<object>>
  rgb: TypeRegistryEntry<any> // Define more specific type if known
  rgba: TypeRegistryEntry<any> // Define more specific type if known
  date: TypeRegistryEntry<Date>
  [key: string]: TypeRegistryEntry<any> | undefined
}

const typeRegistry: TypeRegistry = {
  int: {
    coerce: function coerceInt(value: any): number {
      return Math.floor(value || 0)
    },
  },
  number: {
    coerce: function coerceNumber(value: any): number {
      return +value
    },
  },
  string: {
    coerce: function coerceString(value: any): string {
      return '' + value
    },
  },
  boolean: {
    coerce: function coerceBoolean(value: any): boolean {
      return !!value
    },
  },
  array: {
    coerce: function coerceArray(value: any): any[] {
      return value
    },
  },
  frozenArray: {
    coerce: function coerceFrozenArray(value: any): ReadonlyArray<any> {
      return SAType.deepFreeze(utils.cloneDeep(value)) as ReadonlyArray<any>
    },
  },
  object: {
    coerce: function coerceObject(value: any): object {
      return value
    },
  },
  frozenObject: {
    coerce: function coerceFrozenObject(value: any): Readonly<object> {
      return SAType.deepFreeze(utils.cloneDeep(value))
    },
  },
  rgb: {
    coerce: function coerceRgb(value: any): any {
      return value
    },
  },
  rgba: {
    coerce: function coerceRgba(value: any): any {
      return value
    },
  },
  date: {
    coerce: function coerceDate(value: any): Date {
      return new Date(value)
    },
  },
}

export const SAType = {
  /**
   * Coerces a value to a specified type.
   * @param type The target type. Can be a string key from typeRegistry or a constructor function.
   * @param value The value to coerce.
   * @returns The coerced value.
   */
  coerce: function coerce(
    type: string | AnyConstructor | Function | null | undefined,
    value: any,
  ): any {
    if (value == null) {
      // Handles both null and undefined
      return null
    } else {
      if (utils.isString(type)) {
        const typeEntry = typeRegistry[type as string]
        if (typeEntry && utils.isFunction(typeEntry.coerce)) {
          value = typeEntry.coerce.call(null, value)
        }
      } else if (utils.isFunction(type)) {
        // Check if 'type' is a constructor function.
        // The 'instanceof' operator requires the right-hand side to be a constructor.
        // We cast 'type' to 'AnyConstructor' to satisfy TypeScript's check here.
        // This assumes that if a function is passed, it's intended to be used as a constructor.
        if (!(value instanceof (type as AnyConstructor))) {
          try {
            value = new (type as AnyConstructor)(value)
          } catch (e) {
            // console.warn(`SAType.coerce: Could not instantiate type ${type.name} with value:`, value, e);
            // Keep original value if construction fails, or handle error as needed
          }
        }
      }
    }
    return value
  },

  /**
   * Recursively freezes an object and its properties.
   * @param obj The object to freeze.
   * @returns The frozen object.
   */
  deepFreeze: function deepFreeze<T>(obj: T): Readonly<T> {
    if (utils.isObject(obj) && !Object.isFrozen(obj)) {
      Object.freeze(obj)
      utils.forOwn(obj as any, (val: any) => {
        let shouldRecurse = true
        // Ensure cc and cc.Class are defined and val is an instance of cc.Class
        // (cc.Class as AnyConstructor) tells TypeScript to treat cc.Class as a constructor for instanceof
        if (
          typeof cc !== 'undefined' &&
          cc.Class &&
          val instanceof (cc.Class as AnyConstructor)
        ) {
          shouldRecurse = false
        }
        if (shouldRecurse) {
          deepFreeze(val)
        }
      })
    }
    return obj as Readonly<T>
  },
}
