/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-29 15:39:43
 * @LastEditTime: 2021-05-07 20:02:30
 * @FilePath: /ts-api/src/axios.ts
 */
import Axios from './core/Axios'
import { extend } from '../helpers/util'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from '../type/index'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  let instance = Axios.prototype.request.bind(context)
  instance = extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
