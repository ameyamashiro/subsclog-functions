import { makePrismaSchema } from 'nexus-prisma'
import datamodelInfo from './__generated__/nexus'
import { prisma } from './__generated__/prisma'
import { ReviewCreateInput } from './inputObjectTypes/ReviewCreateInput'
import { createReview } from './mutationFields/createReview'
import { Mutation } from './prismaObjectTypes/mutation'
import { Query } from './prismaObjectTypes/query'
import { hello } from './queryFields/hello'

export default makePrismaSchema({
  types: [Mutation, Query, ReviewCreateInput, createReview, hello],
  outputs: false,
  prisma: { datamodelInfo, client: prisma }
})
