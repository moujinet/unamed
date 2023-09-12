import { load } from 'cheerio'
import type { IApiResponse, IMetaData } from '~/types'
import { BOOKMARK_URL_REQUIRED } from '~/utils/errors'

interface IFetchMetaBody {
  url: string
}

export default defineEventHandler(async (event): IApiResponse<IMetaData | null> => {
  const { url } = await readBody<IFetchMetaBody>(event)

  if (!url || url.trim() === '')
    return error(BOOKMARK_URL_REQUIRED)

  const origin = new URL(url).origin

  function normalizeUrl(path: string) {
    if (path.startsWith(origin) || path.startsWith('http'))
      return path
    return path ? `${origin}/${path.replace(/^\//g, '')}` : `${origin}/favicon.ico`
  }

  const data = await $fetch<string>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  })

  const $ = load(data)

  const name = $('meta[name="og:site_name"]').attr('content')
  || $('meta[name="og:title"]').attr('content')
  || $('meta[name="twitter:title"]').attr('content')
  || $('title').first().text()

  const description = $('meta[name="og:description"]').attr('content')
  || $('meta[name="twitter:description"]').attr('content')
  || $('meta[name="description"]').attr('content')
  || ''

  const icon = $('link[rel="apple-touch-icon"]').attr('href')
  || $('link[rel="alternate icon"]').attr('href')
  || $('link[rel="icon"]').attr('href')
  || ''

  const meta: IMetaData = {
    name,
    description,
    icon: normalizeUrl(icon),
  }

  return payload<IMetaData>(meta)
})
