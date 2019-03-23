import { firestore, storage } from 'firebase-admin'
import { region } from 'firebase-functions'
import { FILES } from '../constants/collection'
import { US_CENTRAL1 } from '../constants/region'
import { File } from '../types/firestore/file'

const path = `${FILES}/{fileId}`

const handler = async (snapshot: firestore.DocumentSnapshot): Promise<void> => {
  const file = snapshot.data() as File

  await storage()
    .bucket(file.bucketName)
    .file(file.filePath)
    .delete()
}

module.exports = region(US_CENTRAL1)
  .firestore.document(path)
  .onDelete(handler)
