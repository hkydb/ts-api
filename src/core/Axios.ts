/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-29 09:56:35
 * @LastEditTime: 2021-05-04 21:59:08
 * @FilePath: /ts-api/src/core/Axios.ts
 */

import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
  ResolveFn,
  RejectFn
} from '../../type/index'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptor'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolve: ResolveFn | ((config: AxiosRequestConfig) => AxiosPromise)
  reject?: RejectFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    const promiseChain: PromiseChain[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      promiseChain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      promiseChain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (promiseChain.length) {
      const { resolve, reject } = promiseChain.shift()!
      promise = promise.then(resolve, reject)
    }

    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithoutData('delete', url, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithData('put', url, data, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithData('post', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithData('patch', url, data, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestWithoutData('options', url, config)
  }

  __requestWithoutData(method: string, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  __requestWithData(method: string, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
