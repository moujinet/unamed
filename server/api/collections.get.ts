import { getCollections } from '~/server/model/collection'
import type { ICollectionModel } from '~/types'

export default defineEventHandler(async () => {
  // TODO: Pined collections support

  return payload<ICollectionModel[]>(
    await getCollections(),
  )
})
