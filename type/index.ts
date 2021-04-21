export interface AxiosRequestCofig {
  url: string
  method?: Method
  data?: any
  params?: any
}

export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'