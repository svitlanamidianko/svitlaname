import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'yummy-collections.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(fileContents);
  const contentHtml = processedContent.toString();

  return {
    props: {
      contentHtml,
    },
  };
}

export default function YummyCollections({ contentHtml }) {
  return (
    <>
      <Head>
        <title>svitlana's yummy collections 📚</title>
        <meta content="svitlana's yummy collections 📚" name="description" />
        <meta content="svitlana's yummy collections 📚" property="og:title" />
        <meta content="svitlana's yummy collections 📚" property="og:description" />
        <meta content="svitlana's yummy collections 📚" property="twitter:title" />
        <meta content="svitlana's yummy collections 📚" property="twitter:description" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <div className="page-wrapper">
        <Header />
        <div className="section blog">
          <div className="container-medium-768px w-container">
            <div className="div-block-5">
              <div className="paragraph" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <style jsx global>{`
        /* Markdown links: lighter by default, darker on hover; global to affect raw HTML */
        .div-block-5 .paragraph a {
          color: var(--neutral-500) !important;
        }
        .div-block-5 .paragraph a:hover {
          color: var(--neutral-600) !important;
        }
      `}</style>
    </>
  );
} 