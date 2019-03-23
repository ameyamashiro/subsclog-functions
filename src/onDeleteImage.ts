import { firestore } from 'firebase-admin'
import { region } from 'firebase-functions'
import { IMAGES } from './constants/collection'
import { US_CENTRAL1 } from './constants/region'
import { deleteImageURL } from './helpers/deleteImageURL'
import { Image } from './types/firestore/image'

const path = `${IMAGES}/{imageId}`

const handler = async (snapshot: firestore.DocumentSnapshot): Promise<void> => {
  const image = snapshot.data() as Image

  await deleteImageURL(image.filePath)
}

module.exports = region(US_CENTRAL1)
  .firestore.document(path)
  .onDelete(handler)
