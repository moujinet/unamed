import type { ITagModel } from '~/types/model'

export async function getTag(id: number) {
  return await useFetchAPI<ITagModel>(`/api/tag/${id}`)
}

export async function getTags(search?: string, limit?: number) {
  return await useFetchAPI<ITagModel[]>(
    search ? `/api/tags/${search}` : '/api/tags',
    {
      params: {
        limit,
      },
    },
  )
}

export async function createTag(name: string) {
  return await useFetchAPI<null>('/api/tag', {
    method: 'POST',
    body: {
      name,
    },
  })
}

export async function updateTag(id: number, name: string) {
  return await useFetchAPI<null>(`/api/tag/${id}`, {
    method: 'PUT',
    body: {
      name,
    },
  })
}

export async function deleteTag(id: number) {
  return await useFetchAPI<null>(`/api/tag/${id}`, {
    method: 'DELETE',
  })
}
