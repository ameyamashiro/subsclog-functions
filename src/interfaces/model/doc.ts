import { firestore } from 'firebase-admin'
import { Id } from './id'

export interface Doc extends Id {
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}
