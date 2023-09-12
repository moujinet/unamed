import type { IApiResponse } from '~/types'

export default defineEventHandler(async (event): IApiResponse<null> => {
  if (event.context.token)
    await destroyToken(event.context.token)

  return success()
})
