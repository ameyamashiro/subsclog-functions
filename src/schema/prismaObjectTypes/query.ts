import { prismaObjectType } from 'nexus-prisma'

export const Query = prismaObjectType({
  name: 'Query',
  definition: t => {
    t.prismaFields([
      'category',
      'categories',
      'review',
      'reviews',
      'service',
      'services'
    ])
  }
})
