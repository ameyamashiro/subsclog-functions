import axios from 'axios'
import { region } from 'firebase-functions'
import { US_CENTRAL1 } from './constants/region'

const handler = async () => {
  const functionNames: string[] = []
  const requests = functionNames.map(functionName => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    return axios.post(createUrl(functionName), { data: { ping: true } }, config)
  })

  Promise.all(requests).catch(err => {
    console.error(err)
  })
}

const createUrl = (functionName: string) => {
  const { projectId } = JSON.parse(process.env.FIREBASE_CONFIG as any)

  return `https://us-central1-${projectId}.cloudfunctions.net/${functionName}`
}

module.exports = region(US_CENTRAL1)
  .pubsub.topic('ping')
  .onPublish(handler)
