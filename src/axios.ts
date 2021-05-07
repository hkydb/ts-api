/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-29 15:39:43
 * @LastEditTime: 2021-05-07 20:02:30
 * @FilePath: /ts-api/src/axios.ts
 */
import Axios from './core/Axios'
import { extend } from '../helpers/util';
import { AxiosInstance, AxiosRequestConfig } from '../type/index';
import defaults from './defaults';


function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  let instance = Axios.prototype.request.bind(context)
  instance = extend(instance, context)
  return instance as AxiosInstance
}


const axios = createInstance(defaults)

export default axios

