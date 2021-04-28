import { AxiosRequestConfig, AxiosResponse } from '../type/index';

export class AxiosError extends Error {
  request?: any
  response?: AxiosResponse
  config: AxiosRequestConfig
  code?: string | null
  isAxiosError: boolean
  constructor(
    message: string,
    config: AxiosRequestConfig,
    request?: any,
    code?: string | null,
    response?: AxiosResponse
  ) {
    super(message)
    this.request = request,
      this.response = response,
      this.config = config,
      this.code = code
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createAxiosError(
  message: string,
  config: AxiosRequestConfig,
  request?: any,
  code?: string | null,
  response?: AxiosResponse,
) {
  const errorMsg = new AxiosError(message, config, request, code, response)
  return errorMsg
}