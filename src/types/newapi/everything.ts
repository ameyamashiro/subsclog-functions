export type NewsapiEverything = {
  author: string
  content: string | null
  description: string
  publishedAt: string
  source: {
    id: string | null
    name: string
  }
  title: string
  url: string
  urlToImage: string
}
