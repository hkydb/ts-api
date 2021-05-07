/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-25 19:43:57
 * @LastEditTime: 2021-05-07 20:08:41
 * @FilePath: /ts-api/helpers/headers.ts
 */
import { isPlainObject, deepMerge } from './util';
import { Method } from '../type/index';

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach((item) => {
    let [key, value] = item.split(':')
    if (!key) {
      return
    }
    key = key.toLowerCase()
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}