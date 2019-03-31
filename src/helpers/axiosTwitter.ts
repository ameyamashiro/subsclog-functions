import axios from 'axios'
import { getTwitterAccessToken } from './getTwitterAccessToken'

export const createAxiosTwitter = async () => {
  const accessToken = await getTwitterAccessToken()

  return axios.create({
    baseURL: 'https://api.twitter.com/1.1/',
    headers: { authorization: `Bearer ${accessToken}` }
  })
}
