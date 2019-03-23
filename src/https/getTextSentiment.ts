import { region, Request, Response } from 'firebase-functions'
import { US_CENTRAL1 } from '../constants/region'
import language from '@google-cloud/language'

const handler = async (req: Request, res: Response) => {
  const client = new language.LanguageServiceClient()

  const document = {
    content: 'こんにちは',
    type: 'PLAIN_TEXT'
  }

  const [result] = await client.analyzeSentiment({ document })

  res.json(result)
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)
