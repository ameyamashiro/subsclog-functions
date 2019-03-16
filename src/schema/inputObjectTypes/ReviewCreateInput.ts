import { inputObjectType } from 'nexus'

export const ReviewCreateInput = inputObjectType({
  name: 'ReviewCreateInput',
  definition(t) {
    t.int('rating', { required: true })
    t.string('text', { required: true })
    t.string('serviceId', { required: true })
  }
})
