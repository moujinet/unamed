import type { ICollectionIcon } from '~/types'

export async function useCollectionIcons() {
  return await useAsyncData(
    'collection-icons',
    () => $fetch<ICollectionIcon[]>('/json/collection-icons.json'),
  )
}
