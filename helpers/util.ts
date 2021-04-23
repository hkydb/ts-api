/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-23 16:17:38
 * @LastEditTime: 2021-04-23 16:29:11
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
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object';
}

