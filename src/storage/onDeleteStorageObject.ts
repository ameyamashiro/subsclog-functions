import { region } from 'firebase-functions'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'
import { FILES, IMAGES } from '../constants/collection'
import { US_CENTRAL1 } from '../constants/region'
import { doc } from '../utils/doc'
import { toFileName } from '../utils/toFileName'

const handler = async (object: ObjectMetadata) => {
  if (typeof object.name !== 'string') {
    console.error('object.name not found')
    return
  }

  const fileId = toFileName(object.name)

  await doc(IMAGES, fileId).delete()

  const file = await doc(FILES, fileId).get()

  if (file.exists) {
    await doc(FILES, fileId).delete()
  }
}

module.exports = region(US_CENTRAL1)
  .storage.object()
  .onDelete(handler)
