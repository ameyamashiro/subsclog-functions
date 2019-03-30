import axios from 'axios'
import { config } from 'firebase-functions'

export const searchTweets = async (accessToken: string, hashtag: string) => {
  const result = await axios({
    method: 'get',
    baseURL: 'https://api.twitter.com/1.1/',
    url: '/search/tweets.json',
    params: { q: `#${hashtag}` },
    headers: { authorization: `Bearer ${accessToken}` }
  })

  if (result.status !== 200) {
    return []
  }

  const statuses = result.data.statuses as any[]

  return statuses.map(statuse => {
    return {
      id: statuse.id_str,
      text: statuse.text
    }
  })
}
