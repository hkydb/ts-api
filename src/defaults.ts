
/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-05-05 21:49:53
 * @LastEditTime: 2021-05-07 19:34:52
 * @FilePath: /ts-api/src/defaults.ts
 */

import { AxiosRequestConfig } from '../type/index'


let defaults: AxiosRequestConfig = {
  method: 'get',
  headers: {
    common: {
      Accept: 'applocation/json, text/plain, */*'
    }
  },
  timeout: 0
}

const methodNoData = ['get', 'delete', 'head', 'option']
methodNoData.forEach((item) => {
  defaults.headers[item] = {}
})

const methodWithData = ['put', 'post', 'patch']
methodWithData.forEach((item) => {
  defaults.headers[item] = {
    'Conten-Type': 'application/x-www-form-urlencoded'
  }
})


export default defaults