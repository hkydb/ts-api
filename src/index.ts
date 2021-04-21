import { AxiosRequestCofig } from '../type/index';
import xhr from './xhr'


function axios(config: AxiosRequestCofig): void {
  xhr(config)
}

export default axios