import { type ErrorCode, SUCCESS, getErrorMessage } from '~/utils/errors'
import type { IApiResponse } from '~/types'

export function payload<T = any>(
  data: T,
  code: ErrorCode = SUCCESS,
  message?: string,
): IApiResponse {
  return {
    code,
    data,
    message: message || getErrorMessage(code),
  }
}

export function error(code: ErrorCode) {
  return payload(null, code, getErrorMessage(code))
}

export const success = () => payload(null)
