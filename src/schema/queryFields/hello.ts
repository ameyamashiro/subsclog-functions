import { queryField } from 'nexus'

export const hello = queryField('hello', {
  type: 'String',
  args: {},
  resolve: () => 'hello'
})
