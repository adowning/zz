export function isObject(v: null) {
    return v !== null && typeof v === 'object' && Array.isArray(v) !== true
}

export function isDate(v: any) {
    return Object.prototype.toString.call(v) === '[object Date]'
}

export function isRegexp(v: any) {
    return Object.prototype.toString.call(v) === '[object RegExp]'
}

export function isNumber(v: number) {
    return typeof v === 'number' && isFinite(v)
}


export function encode(value: any) {
    if (isDate(value) === true) {
        return '__q_date|' + value.getTime()
    }
    if (isRegexp(value) === true) {
        return '__q_expr|' + value.source
    }
    if (typeof value === 'number') {
        return '__q_numb|' + value
    }
    if (typeof value === 'boolean') {
        return '__q_bool|' + (value ? '1' : '0')
    }
    if (typeof value === 'string') {
        return '__q_strn|' + value
    }
    if (typeof value === 'function') {
        return '__q_strn|' + value.toString()
    }
    if (value === Object(value)) {
        return '__q_objt|' + JSON.stringify(value)
    }

    // hmm, we don't know what to do with it,
    // so just return it as is
    return value
}

export function decode(value: string) {
    const length = value.length
    if (length < 9) {
        // then it wasn't encoded by us
        return value
    }

    const type = value.substring(0, 8)
    const source = value.substring(9)

    switch (type) {
        case '__q_date':
            { const number = Number(source)
            return new Date(Number.isNaN(number) === true ? source : number) }

        case '__q_expr':
            return new RegExp(source)

        case '__q_numb':
            return Number(source)

        case '__q_bool':
            return Boolean(source === '1')

        case '__q_strn':
            return '' + source

        case '__q_objt':
            return JSON.parse(source)

        default:
            // hmm, we reached here, we don't know the type,
            // then it means it wasn't encoded by us, so just
            // return whatever value it is
            return value
    }
}
