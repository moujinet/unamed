import type { ErrorCode } from '~/utils/errors'

export type { ErrorCode } from '~/utils/errors'

export type IApiResponse<T = any> = Promise<IApiPayload<T>>

export interface IApiPayload<T = any> {
  code: ErrorCode
  data: T
  message?: string
}
