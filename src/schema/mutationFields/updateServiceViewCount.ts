import { arg, mutationField } from 'nexus'
import { prisma } from '../../__generated__/prisma'

export const updateServiceViewCount = mutationField('updateServiceViewCount', {
  args: { data: arg({ type: 'ServiceUpdateViewCountInput', required: true }) },
  type: 'Service',
  resolve: async (_, { data }) => {
    const service = await prisma.service({ id: data.serviceId })
    const viewCount = service.viewCount + 1

    await prisma.updateService({
      where: { id: data.serviceId },
      data: { viewCount }
    })

    return { ...service, viewCount }
  }
})
