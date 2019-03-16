import axios from 'axios'
import * as cors from 'cors'
import * as express from 'express'
import { region, Request, Response } from 'firebase-functions'
import { US_CENTRAL1 } from '../constants/region'

const handler = async (request: Request, response: Response) => {
  const serviceIds = await getServiceIds()
  const categoryIds = await getCategoryIds()

  const hostname = 'https://subsclog.com'

  const urls: string[] = [
    `${hostname}/about`,
    `${hostname}/policy`,
    ...serviceIds.map(id => `${hostname}/services/${id}`),
    ...categoryIds.map(id => `${hostname}/categories/${id}`)
  ]

  const text = urls.join('\n')

  response.end(text)
}

const getServiceIds = async (): Promise<string[]> => {
  const res = await axios('https://subsclog.now.sh/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { query: '{ services { id } }' }
  })

  return res.data.data.services.map((service: any) => service.id)
}

const getCategoryIds = async (): Promise<string[]> => {
  const res = await axios('https://subsclog.now.sh/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { query: '{ categories { id } }' }
  })

  return res.data.data.categories.map((category: any) => category.id)
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)
