/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-29 09:56:35
 * @LastEditTime: 2021-05-07 22:51:47
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
import mergeConfig from './mergeConfig'


interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  reject?: RejectFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
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

    // todo headers.defalut function' s bug
    // config = mergeConfig(this.defaults, config)

    const promiseChain: PromiseChain<any>[] = [
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
