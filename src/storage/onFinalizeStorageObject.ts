import { region } from 'firebase-functions'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'
import { FILES, IMAGES } from '../constants/collection'
import { US_CENTRAL1 } from '../constants/region'
import { createImageURL } from '../helpers/createImageURL'
import { Image } from '../interfaces/model/image'
import { createFile } from '../models/file/createFile'
import { createImage } from '../models/image/createImage'
import { doc } from '../utils/doc'
import { systemFields } from '../utils/systemFIelds'
import { toFileName } from '../utils/toFileName'

const handler = async (object: ObjectMetadata) => {
  if (typeof object.name !== 'string') {
    console.error('object.name not found')
    return
  }

  const fileId = toFileName(object.name)

  const file = {
    ...systemFields(fileId),
    bucketName: object.bucket,
    contentType: object.contentType as string,
    filePath: object.name,
    size: Number(object.size)
  }

  await doc(FILES, fileId).set(file)

  // get imageURL from images API
  const imageURL = await createImageURL(object.name)

  // if imageURL is not null, save it
  if (imageURL) {
    const image: Image = {
      ...systemFields(fileId),
      imageURL,
      bucketName: object.bucket,
      filePath: object.name
    }

    await doc(IMAGES, fileId).set(image)
  }
}

module.exports = region(US_CENTRAL1)
  .storage.object()
  .onFinalize(handler)
