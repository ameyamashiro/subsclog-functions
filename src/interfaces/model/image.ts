import { Doc } from './doc'

export interface Image extends Doc {
  bucketName: string
  filePath: string
  imageURL: string
}
