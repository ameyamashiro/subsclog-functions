import { Doc } from './doc'

export interface File extends Doc {
  bucketName: string
  contentType: string
  filePath: string
  size: number
}
