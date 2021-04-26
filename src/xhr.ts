import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../type/index';
import { parseHeaders } from '../helpers/headers';


export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { method = 'get', data = null, url, headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return
      }
      // response 
      const responsedHeaders = parseHeaders(request.getAllResponseHeaders())
      const response: AxiosResponse = {
        data: responseType && responseType !== 'text' ? request.response : request.responseText,
        status: request.status,
        statusText: request.statusText,
        request,
        headers: responsedHeaders,
        config
      }
      resolve(response)
    }
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}