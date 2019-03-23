import { firestore } from 'firebase-admin'
import { config, region, Request, Response } from 'firebase-functions'
import NewsAPI from 'newsapi'
import { ARTICLES } from '../constants/collection'
import { US_CENTRAL1 } from '../constants/region'
import { get4DaysAgoDate } from '../helpers/get4DaysAgoDate'
import { createNewsApiDate } from '../helpers/createNewsApiDate'
import { Article } from '../types/firestore/article'
import { NewsapiEverything } from '../types/newapi/everything'
import { createId } from '../utils/createId'
import { systemFields } from '../utils/systemFIelds'
import { prisma } from '../__generated__/prisma'

const handler = async (req: Request, res: Response) => {
  const apiKey = config().newsapi.api_key

  const newsapi = new NewsAPI(apiKey)

  const fromDate = get4DaysAgoDate()

  const services = await prisma.services()

  console.log(services)

  const result = await newsapi.v2.everything({
    q: 'サブスク',
    from: createNewsApiDate(fromDate)
  })

  if (result.status !== 'ok') {
    res.end(result)
    return
  }

  const articlesQuerySnap = await firestore()
    .collection(ARTICLES)
    .where('publishedAt', '>=', fromDate)
    .get()

  const articleUrls: string[] = articlesQuerySnap.docs.map(
    snap => snap.data().url
  )

  const newsapiArticles = result.articles as NewsapiEverything[]

  const newArticles = newsapiArticles.filter(
    article => !articleUrls.includes(article.url)
  )

  const batch = firestore().batch()

  for (const newArticle of newArticles) {
    const publishedAt = new Date(newArticle.publishedAt)
    const articleId = createId()
    const article: Article = {
      ...systemFields(articleId),
      author: newArticle.author,
      content: newArticle.content,
      description: newArticle.description,
      publishedAt: firestore.Timestamp.fromDate(publishedAt),
      sourceId: newArticle.source.id,
      sourceName: newArticle.source.name,
      title: newArticle.title,
      url: newArticle.url,
      urlToImage: newArticle.urlToImage
    }
    const ref = firestore()
      .collection(ARTICLES)
      .doc(articleId)

    batch.set(ref, article)
  }

  await batch.commit()

  res.json({ articles: newArticles })
}

module.exports = region(US_CENTRAL1).https.onRequest(handler)
