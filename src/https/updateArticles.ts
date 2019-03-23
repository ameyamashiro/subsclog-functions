import { config, region, Request, Response } from 'firebase-functions'
import NewsAPI from 'newsapi/src'
import { prisma } from '../__generated__/prisma'
import { US_CENTRAL1 } from '../constants/region'
import { createNewsApiDate } from '../helpers/createNewsApiDate'
import { get4DaysAgoDate } from '../helpers/get4DaysAgoDate'
import { NewsapiEverything } from '../types/newapi/everything'

const handler = async (req: Request, res: Response) => {
  const apiKey = config().newsapi.api_key

  const newsapi = new NewsAPI(apiKey)

  const fromDate = get4DaysAgoDate()

  const result = await newsapi.v2.everything({
    q: 'サブスク',
    from: createNewsApiDate(fromDate)
  })

  const articles = result.articles as NewsapiEverything[]

  const upsertLinks = articles.map(article => {
    return prisma.upsertLink({
      where: { url: article.url },
      create: {
        author: article.author,
        content: article.content || undefined,
        description: article.description,
        publishedAt: new Date(article.publishedAt),
        sourceId: article.source.id || undefined,
        sourceName: article.source.name,
        title: article.title,
        url: article.url
      },
      update: { title: article.title }
    })
  })

  await Promise.all(upsertLinks)

  res.json({ articles })
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)
