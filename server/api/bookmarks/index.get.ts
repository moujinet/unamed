import type { IApiResponse, IBookmarkModel } from '~/types'

interface IBookmarkQueryString {
  search?: string
  page?: number
  per_page?: number
}

export default defineEventHandler(async (event): IApiResponse<IBookmarkModel[]> => {
  const { search, page, per_page } = getQuery<IBookmarkQueryString>(event)
  const bookmarks = await searchBookmarks(0, search, page, per_page)

  return payload<IBookmarkModel[]>(bookmarks)
})
