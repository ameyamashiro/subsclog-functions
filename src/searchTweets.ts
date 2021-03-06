import { region, Request, Response } from 'firebase-functions'
import { GET } from './constants/method'
import { US_CENTRAL1 } from './constants/region'
import { createAxiosTwitter } from './helpers/axiosTwitter'
import { getTwitterAccessToken } from './helpers/getTwitterAccessToken'

const handler = async (request: Request, response: Response) => {
  const { q } = request.query

  if (!q) {
    response.status(500)
    response.json({ error: true, message: 'q not found' })
    return
  }

  const axios = await createAxiosTwitter()

  try {
    const result = await axios({
      method: GET,
      params: { q },
      url: '/search/tweets.json'
    })

    const tweets = result.data.statuses.map((statuse: any) => {
      return { id: statuse.id_str, text: statuse.text, userId: statuse.user.id }
    })

    response.json(tweets)
  } catch (e) {
    response.status(e.response.status)
    response.header(e.response.header)
    response.json(e.response.data)
  }
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)
