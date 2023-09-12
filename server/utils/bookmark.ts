import { prisma } from '~/prisma/client'

export async function searchBookmarks(collectionId?: number, search?: string, pageNo?: number, perPage?: number) {
  return await prisma.bookmark.findMany({
    where: search
      ? {
          collection_id: collectionId === 0 ? undefined : collectionId,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              url: {
                contains: search,
              },
            },
          ],
        }
      : { collection_id: collectionId === 0 ? undefined : collectionId },
    orderBy: {
      created_at: 'desc',
    },
    skip: ((pageNo || 1) - 1) * (perPage || 20),
    take: (perPage || 20),
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}
