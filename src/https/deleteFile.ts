import { https, region } from 'firebase-functions'
import { FILES } from '../constants/collection'
import { DeleteFile } from '../interfaces/https/DeleteFile'
import { document } from '../utils/document'
import { getUserId } from '../utils/getUserId'
import { internalError } from '../utils/internalError'
import { isUndefined } from '../utils/isUndefined'

const handler = async (data: DeleteFile, context: https.CallableContext): Promise<null> => {
  if (isUndefined(data.fileId)) {
    throw new https.HttpsError('invalid-argument', 'fileId not found')
  }

  const uid = getUserId(context)

  if (!uid) {
    throw new https.HttpsError('unauthenticated')
  }

  try {
    await document(FILES, data.fileId).delete()
  } catch (e) {
    throw internalError(e)
  }

  return null
}

export = region('asia-northeast1').https.onCall(handler)
