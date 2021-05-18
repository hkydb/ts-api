/*
 * @Auth: Marcuse Yellen
 * @Date: 2021-04-29 20:48:44
 * @LastEditTime: 2021-05-04 21:58:46
 * @FilePath: /ts-api/src/core/interceptor.ts
 */
import { ResolveFn, RejectFn } from '../../type/index'

interface Interceptor<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolve: ResolveFn<T>, reject: RejectFn): number {
    this.interceptors.push({ resolve, reject })
    return this.interceptors.length - 1
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
