import type { IBookmarkModel, IMetaData } from '~/types'

export interface IBookmarkFormData {
  collection_id: number
  name: string
  url: string
  description?: string
  icon?: string
  tags?: string[]
}

export async function getBookmark(id: number) {
  return await useFetchAPI<IBookmarkModel>(`/api/bookmark/${id}`)
}

export async function getBookmarks(
  collectionId?: number,
  search?: string,
  page?: number,
  perPage?: number,
) {
  const url = collectionId ? `/api/bookmarks/${collectionId}` : '/api/bookmarks'

  return await useFetchAPI<IBookmarkModel[]>(url, {
    params: {
      search,
      page,
      per_page: perPage,
    },
  })
}

export async function loadBookmarkMeta(url: string): Promise<IMetaData> {
  const { code, data } = await useFetchAPI<IMetaData>('/api/bookmark/metadata', {
    method: 'POST',
    body: {
      url,
    },
  })

  const defaultValue: IMetaData = { name: '', description: '', icon: '' }
  if (code.value === SUCCESS)
    return useData(data, defaultValue)

  return defaultValue
}

export async function createBookmark(data: IBookmarkFormData): Promise<boolean> {
  const { code } = await useFetchAPI<null>('/api/bookmark', {
    method: 'POST',
    body: {
      ...data,
    },
  })

  return code.value === SUCCESS
}

export async function updateBookmark(id: number, data: IBookmarkFormData): Promise<boolean> {
  const { code } = await useFetchAPI<null>(`/api/bookmark/${id}`, {
    method: 'PATCH',
    body: {
      ...data,
    },
  })

  return code.value === SUCCESS
}

export async function deleteBookmark(id: number): Promise<boolean> {
  const { code } = await useFetchAPI<null>(`/api/bookmark/${id}`, {
    method: 'DELETE',
  })

  return code.value === SUCCESS
}
