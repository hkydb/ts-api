/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-29 10:27:37
 * @LastEditTime: 2021-05-07 22:02:41
 * @FilePath: /ts-api/src/core/dispatchRequest.ts
 */
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../../type/index';
import xhr from './xhr'
import { transformRequest, transformResponse } from '../../helpers/data';
import { buildURL } from '../../helpers/url'
import { flattenHeaders } from '../../helpers/headers'


export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// function transformHeader(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }