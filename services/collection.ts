import type { ICollectionModel, IOption } from '~/types'

export interface ICollectionIcon {
  name: string
  icons: string[]
}

export async function getCollectionIcons() {
  return await useAsyncData(
    'collection-icons',
    () => $fetch<ICollectionIcon[]>('/json/collection-icons.json'),
  )
}

export async function getCollection(id: number): Promise<ICollectionModel | null> {
  const { code, data } = await useFetchAPI<ICollectionModel>(`/api/collection/${id}`)

  if (code.value === SUCCESS)
    return useData(data, null)

  return null
}

export async function getCollections() {
  return await useFetchAPI<ICollectionModel[]>('/api/collections')
}

export async function getCollectionsOptions(): Promise<IOption<string>[]> {
  const { code, data } = await useFetchAPI<ICollectionModel[]>('/api/collections')

  if (code.value === SUCCESS) {
    return data.value
      ? data.value.map(collection => ({
        label: collection.name,
        value: collection.id.toString(),
        icon: collection.icon,
      } as IOption<string>))
      : []
  }

  return []
}

export async function createCollection(name: string, icon: string) {
  return await useFetchAPI<null>('/api/collection', {
    method: 'post',
    body: {
      name,
      icon,
    },
  })
}

export async function updateCollection(id: number, name: string, icon: string) {
  return await useFetchAPI<null>(`/api/collection/${id}`, {
    method: 'put',
    body: {
      name,
      icon,
    },
  })
}

export async function deleteCollection(id: number) {
  const { code } = await useFetchAPI<null>(`/api/collection/${id}`, {
    method: 'delete',
  })

  return code.value === SUCCESS
}
