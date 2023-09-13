import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import type { IApiPayload } from '~/types'

export async function useFetchAPI<T>(
  url: string,
  options: UseFetchOptions<IApiPayload<T>> = {},
) {
  const toast = useToast()
  const { token } = useSession()

  const defaults: UseFetchOptions<IApiPayload<T>> = {
    headers: token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {},
    async onResponse(ctx) {
      if (ctx.response._data.code !== SUCCESS) {
        if (ctx.response.status === 401) {
          useSession().clear()
          await navigateTo('/')
        }
        else {
          throw new Error(ctx.response._data.message)
        }
      }
    },
    async onResponseError(ctx) {
      toast.error({
        description: ctx.response._data.message,
      })
    },
  }
  const params = defu(options, defaults)

  const {
    status,
    data: asyncData,
    pending,
    error,
    refresh,
    execute,
  } = await useFetch(url, params)

  const data = computed(() => asyncData.value?.data)
  const code = computed(() => asyncData.value?.code)
  const message = computed(() => asyncData.value?.message)

  return {
    data,
    code,
    message,
    asyncData,
    status,
    pending,
    error,
    refresh,
    execute,
  }
}
