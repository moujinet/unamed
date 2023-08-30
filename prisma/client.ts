/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-globals */
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma
  = global.prisma
  || new PrismaClient({
    log: ['error'],
  })

// eslint-disable-next-line n/prefer-global/process
if (process.env.NODE_ENV !== 'production')
  global.prisma = prisma
