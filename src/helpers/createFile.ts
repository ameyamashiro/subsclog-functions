import { File } from '../types/firestore/file'
import { systemFields } from '../utils/systemFIelds'

interface Input {
  id: string
  bucketName: string
  contentType: string
  filePath: string
  size: number
}

export const createFile = (input: Input): File => {
  return {
    ...systemFields(input.id),
    bucketName: input.bucketName,
    contentType: input.contentType,
    filePath: input.filePath,
    size: input.size
  }
}
