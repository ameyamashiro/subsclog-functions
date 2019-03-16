import { arg, mutationField } from 'nexus'
import { prisma } from '../__generated__/prisma'

export const createReview = mutationField('createReview', {
  args: { data: arg({ type: 'ReviewCreateInput', required: true }) },
  type: 'Review',
  resolve: async (_, { data }) => {
    const review = await prisma.createReview({
      text: data.text,
      rating: data.rating,
      serviceId: data.serviceId,
      service: { connect: { id: data.serviceId } }
    })

    const reviews = await prisma.reviews({
      where: { serviceId: data.serviceId }
    })

    const ratings = [...reviews.map(review => review.rating), data.rating]

    const ratingCount = ratings.length

    const ratingStr = (
      ratings.reduce((a, b) => a + b, 0) / ratingCount
    ).toString()

    const rating = parseInt(ratingStr)

    await prisma.updateService({
      where: { id: data.serviceId },
      data: { rating, ratingCount }
    })

    return review
  }
})
