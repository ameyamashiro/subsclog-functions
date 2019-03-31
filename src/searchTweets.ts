import language from '@google-cloud/language'
import { region, Request, Response } from 'firebase-functions'
import { US_CENTRAL1 } from './constants/region'
import axios from 'axios'
import { getTwitterAccessToken } from './helpers/getTwitterAccessToken'
import { searchTweets } from './helpers/searchTweets'

const handler = async (req: Request, res: Response) => {
  if (!('q' in req.query)) {
    res.status(500)
    res.json({ error: true, message: 'hashtag not found' })
    return
  }

  const accessToken = await getTwitterAccessToken()

  const tweets = await searchTweets(accessToken, req.query.q)

  res.json(tweets)
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)