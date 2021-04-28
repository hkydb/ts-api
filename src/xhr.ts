import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../type/index';
import { parseHeaders } from '../helpers/headers'
import { createAxiosError } from '../helpers/error';



export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { method = 'get', data = null, url, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
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
      handleResponse(response)
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createAxiosError(
          `Request failed with status code ${response.status}`,
          config,
          request,
          null,
          response
        ))
      }
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(createAxiosError(
        `Timeout of ${timeout} ms exceeded !`,
        config,
        request,
        'ECONNABORTED',
      ))
    }

    request.onerror = function handleError() {
      reject(createAxiosError(
        'Network Error',
        config,
        request,
        null
      ))
    }
    request.send(data)
  })
}