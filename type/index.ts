export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text"


export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'


export interface AxiosResponse {
  data?: any
  status: number
  statusText: string
  request: any
  headers: any
  config: AxiosRequestConfig
}


export interface AxiosPromise extends Promise<AxiosResponse> {

}