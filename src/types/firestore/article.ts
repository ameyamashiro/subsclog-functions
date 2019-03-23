import { firestore } from 'firebase-admin'
import { Doc } from '../../interfaces/model/doc'

export type Article = Doc & {
  author: string
  content: string | null
  description: string
  publishedAt: firestore.Timestamp
  sourceId: string | null
  sourceName: string
  title: string
  url: string
  urlToImage: string
}
