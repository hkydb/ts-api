/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-23 16:17:38
 * @LastEditTime: 2021-05-07 22:27:44
 * @FilePath: /ts-api/helpers/util.ts
 */

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]';
}


/**
 * Determine if a value is an Object
 *
 * @param {any} val The value to test
 * @returns {object} True if value is an Object, otherwise false
 */
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object';
// }

/**
 * Determine if a value is an JSON Object
 *
 * @param {any} val The value to test
 * @returns {object} True if value is an Object, otherwise false
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}


export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

