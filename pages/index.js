import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
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
        <meta content="Svitlana Midianko | Home" property="og:title" />
        <meta content="Svitlana Midianko | Home" property="twitter:title" />
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
                <img src="/images/photo_2023-03-26-19.40.50.jpeg" alt="" sizes="(max-width: 479px) 87vw, (max-width: 767px) 297.998046875px, (max-width: 991px) 36vw, 297.998046875px" srcSet="/images/photo_2023-03-26-19.40.50-p-500.jpeg 500w, /images/photo_2023-03-26-19.40.50.jpeg 640w" className="image home-hero" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
} 