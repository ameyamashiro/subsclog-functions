import axios from 'axios'
import { config } from 'firebase-functions'

export const getTwitterAccessToken = async () => {
  const twitterConfig = config().twitter

  if (!twitterConfig) {
    return null
  }

  const source = twitterConfig.api_key + ':' + twitterConfig.api_secret_key
  const token = Buffer.from(source).toString('base64')

  const result = await axios({
    method: 'post',
    baseURL: 'https://api.twitter.com/',
    url: '/oauth2/token',
    params: { grant_type: 'client_credentials' },
    headers: {
      authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })

  return result.data.access_token
}
