import type { ErrorCode } from '~/utils/errors'

export type { ErrorCode } from '~/utils/errors'

export interface IApiResponse<T = any> {
  code: ErrorCode
  data: T
  message?: string
}
