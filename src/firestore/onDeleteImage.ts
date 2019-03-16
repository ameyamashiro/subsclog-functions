import { firestore } from 'firebase-admin'
import { region } from 'firebase-functions'
import { IMAGES } from '../constants/collection'
import { US_CENTRAL1 } from '../constants/region'
import { deleteImageURL } from '../helpers/deleteImageURL'
import { Image } from '../interfaces/model/image'
import { toNode } from '../utils/toNode'

const path = `${IMAGES}/{imageId}`

const handler = async (snapshot: firestore.DocumentSnapshot): Promise<void> => {
  const image: Image = toNode(snapshot)

  await deleteImageURL(image.bucketName, image.filePath)
}

export = region(US_CENTRAL1).firestore.document(path).onDelete(handler)
