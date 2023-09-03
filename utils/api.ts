import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import type { IApiResponse } from '~/types'

export async function useFetchAPI<T>(
  url: string,
  options: UseFetchOptions<IApiResponse<T>> = {},
) {
  const toast = useToast()
  const { token } = useSession()

  const defaults: UseFetchOptions<IApiResponse<T>> = {
    headers: token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {},
    async onResponse(ctx) {
      if (ctx.response._data.code !== SUCCESS) {
        toast.error({
          title: 'Oops',
          description: ctx.response._data.message,
        })

        if (ctx.response.status === 401) {
          useSession().clear()
          navigateTo('/')
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
