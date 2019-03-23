import { inputObjectType } from 'nexus'

export const ServiceUpdateViewCountInput = inputObjectType({
  name: 'ServiceUpdateViewCountInput',
  definition(t) {
    t.string('serviceId', { required: true })
  }
})
