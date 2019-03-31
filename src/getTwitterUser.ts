import { region, Request, Response } from 'firebase-functions'
import { GET } from './constants/method'
import { US_CENTRAL1 } from './constants/region'
import { createAxiosTwitter } from './helpers/axiosTwitter'

const handler = async (request: Request, response: Response) => {
  const { screenName } = request.query

  if (!screenName) {
    response.status(500)
    response.json({ error: true, message: 'screenName not found' })
    return
  }

  const axios = await createAxiosTwitter()

  try {
    const result = await axios({
      method: GET,
      params: { screen_name: screenName },
      url: '/users/show'
    })

    response.json(result.data)
  } catch (e) {
    response.status(e.response.status)
    response.header(e.response.header)
    response.json(e.response.data)
  }
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)
