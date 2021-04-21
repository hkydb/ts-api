import { AxiosRequestCofig } from '../type/index';


export default function xhr(config: AxiosRequestCofig): void {
  const { method = 'get', data = null, url } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}