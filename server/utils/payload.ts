import { type ErrorCode, SUCCESS, getErrorMessage } from '~/utils/errors'
import type { IApiPayload } from '~/types'

export function payload<T = any>(
  data: T,
  code: ErrorCode = SUCCESS,
  message?: string,
): IApiPayload<T> {
  return {
    code,
    data,
    message: message || getErrorMessage(code),
  }
}

export function error(code: ErrorCode): IApiPayload<null> {
  return payload<null>(null, code, getErrorMessage(code))
}

export const success = () => payload<null>(null)
