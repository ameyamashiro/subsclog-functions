import * as cors from 'cors'
import * as express from 'express'
import { region, Request, Response } from 'firebase-functions'
import fetch from 'node-fetch'
import { createSitemap } from 'sitemap'

const handler = async (request: Request, response: Response) => {
  const serviceIds = await getServiceIds()
  const categoryIds = await getCategoryIds()

  const urls = [
    { url: '/about' },
    { url: '/polivacypolicy' },
    { url: '/search' }
  ]

  for (const id of serviceIds) {
    urls.push({ url: `/services/${id}` })
  }

  for (const id of categoryIds) {
    urls.push({ url: `/categories/${id}` })
  }

  const sitemap = createSitemap({
    hostname: 'https://subsclog.com',
    cacheTime: 600000,
    urls
  })

  sitemap.toXML((err: any, xml: any) => {
    if (err) {
      return response.status(500).end()
    }
    response.header('Content-Type', 'application/xml')
    response.send(xml)
  })
}

const getServiceIds = async () => {
  const res = await fetch('https://graphql.subsclog.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ services { id } }' })
  })

  const json = await res.json()

  return json.data.services.map((service: any) => service.id)
}

const getCategoryIds = async () => {
  const res = await fetch('https://graphql.subsclog.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ categories { id } }' })
  })

  const json = await res.json()

  return json.data.categories.map((category: any) => category.id)
}

const app = express()

app.use(cors({ origin: true }))

app.use(handler)

export = region('asia-northeast1').https.onRequest(app)
