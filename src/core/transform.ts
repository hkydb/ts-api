/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-05-11 15:27:25
 * @LastEditTime: 2021-05-11 15:44:48
 * @FilePath: /ts-api/src/core/transform.ts
 */

import { AxiosTransformer } from '../../type/index'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
) {
  if (!fns) return data
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
