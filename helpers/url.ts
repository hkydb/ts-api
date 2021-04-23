/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-21 14:15:02
 * @LastEditTime: 2021-04-23 16:26:21
 * @FilePath: /ts-api/helpers/url.ts
 */

import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * @description: This function dealing the params types such as Array, Object, Date, Null, Hash, Special Character...
 * @param {string} The base of url
 * @param {any} [params] The params to be appended
 * @return {string} The formatted url
 */

export function buildURL(url, params) {
  if (!params) {
    return url
  }

  let parts: string[] = []

  // params-数组、空值、Date...
  // object
  // array
  // date、object
  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (val === null && typeof val === 'undefined') {
      return
    }

    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = val.toString()
      }
      parts.push(`${key}=${val}`)
    })

  })

  let serializedParams = parts.join('&')

  // & #...
  if (serializedParams) {
    const markIndex = url.indexof('#')
    if (markIndex !== -1) {
      url = url.splice(0, markIndex)
    }
    url += (url.indexof('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}