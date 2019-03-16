import { https } from 'firebase-functions'

export class HttpsErrorInternal extends https.HttpsError {
  constructor(private e: any) {
    super('internal', e.errorInfo.code, e.errorInfo.message)
  }
}
