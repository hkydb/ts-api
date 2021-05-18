/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-05-05 21:49:53
 * @LastEditTime: 2021-05-11 16:14:44
 * @FilePath: /ts-api/src/defaults.ts
 */

import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { AxiosRequestConfig } from '../type/index'

let defaults: AxiosRequestConfig = {
  method: 'get',
  headers: {
    common: {
      Accept: 'applocation/json, text/plain, */*'
    }
  },
  timeout: 0,
  tramsformRequest: [
    function(headers: any, data: any) {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  tramsformResponse: [
    function(data: any) {
      return transformResponse(data)
    }
  ]
}

const methodNoData = ['get', 'delete', 'head', 'option']
methodNoData.forEach(item => {
  defaults.headers[item] = {}
})

const methodWithData = ['put', 'post', 'patch']
methodWithData.forEach(item => {
  defaults.headers[item] = {
    'Conten-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
