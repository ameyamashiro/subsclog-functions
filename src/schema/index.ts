import { makePrismaSchema } from 'nexus-prisma'
import datamodelInfo from './__generated__/nexus'
import { prisma } from './__generated__/prisma'
import { ReviewCreateInput } from './inputObjectTypes/ReviewCreateInput'
import { ServiceUpdateViewCountInput } from './inputObjectTypes/ServiceUpdateViewCountInput'
import { createReview } from './mutationFields/createReview'
import { updateService } from './mutationFields/updateService'
import { updateServiceViewCount } from './mutationFields/updateServiceViewCount'
import { Mutation } from './prismaObjectTypes/mutation'
import { Query } from './prismaObjectTypes/query'
import { hello } from './queryFields/hello'

export default makePrismaSchema({
  types: [
    Mutation,
    Query,
    ReviewCreateInput,
    ServiceUpdateViewCountInput,
    createReview,
    hello,
    updateService,
    updateServiceViewCount
  ],
  outputs: false,
  prisma: { datamodelInfo, client: prisma }
})
