import { arg, mutationField } from 'nexus'
import { prisma } from '../../__generated__/prisma'

export const updateService = mutationField('updateService', {
  args: {
    data: arg({ type: 'ServiceUpdateInput', required: true }),
    where: arg({ type: 'ServiceWhereUniqueInput', required: true })
  },
  type: 'Service',
  resolve: async (_, { data, where }) => {
    return prisma.updateService({ data, where })
  }
})
