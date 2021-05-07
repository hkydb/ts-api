
/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-20 21:09:51
 * @LastEditTime: 2021-05-07 22:37:22
 * @FilePath: /ts-api/type/index.ts
 */

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  responseType?: XMLHttpRequestResponseType
  [propName: string]: any
}

type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text"


export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'


export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  request: any
  headers: any
  config: AxiosRequestConfig
}


export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}


export interface AxiosError extends Error {
  request?: any,
  response?: string,
  config: AxiosRequestConfig,
  code?: string,
  isAxiosError: boolean
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  defaults: any
  interceptors: any
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}


export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject: RejectFn): number
  eject(id: number): void
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}
