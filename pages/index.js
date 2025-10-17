import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Slideshow from '../components/Slideshow'
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'index.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(fileContents)
  const contentHtml = processedContent.toString()

  return {
    props: {
      contentHtml,
    },
  }
}

export default function Home({ contentHtml }) {
  return (
    <>
      <Head>
        <title>svitlana in your tab🌻</title>
        <meta content="svitlana in your tab🌻" property="og:title" />
        <meta content="svitlana in your tab🌻" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <div className="page-wrapper">
        <Header />
        <div className="section home-hero">
          <div className="container-default w-container">
            <div className="home-hero-wrapper">
              <div className="split-content home-hero-left">
                <div className="paragraph" dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
              <div className="split-content home-hero-right">
                <Slideshow className="image home-hero" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
} 