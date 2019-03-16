import { https, region } from 'firebase-functions'
import { CODE } from '../constants/code'
import { FILES } from '../constants/collection'
import { US_CENTRAL1 } from '../constants/region'
import { DeleteFile } from '../interfaces/https/DeleteFile'
import { doc } from '../utils/doc'
import { getUserId } from '../utils/getUserId'
import { HttpsErrorInternal } from '../utils/httpsErrorInternal'
import { isUndefined } from '../utils/isUndefined'

const handler = async (
  data: DeleteFile,
  context: https.CallableContext
): Promise<null> => {
  if (isUndefined(data.fileId)) {
    throw new https.HttpsError(CODE.INVALID_ARGUMENT, CODE.INVALID_ARGUMENT)
  }

  const uid = getUserId(context)

  if (!uid) {
    throw new https.HttpsError(CODE.UNAUTHENTICATED, CODE.UNAUTHENTICATED)
  }

  try {
    await doc(FILES, data.fileId).delete()
  } catch (e) {
    throw new HttpsErrorInternal(e)
  }

  return null
}

module.exports = region(US_CENTRAL1).https.onCall(handler)
