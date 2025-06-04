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
  const filePath = path.join(process.cwd(), 'misc.md');
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

export default function Misc({ contentHtml }) {
  return (
    <>
      <Head>
        <title>svitlana's misc pour 🐧</title>
        <meta content="🐧svitlana's misc pour" name="description" />
        <meta content="🐧svitlana's misc pour" property="og:title" />
        <meta content="🐧svitlana's misc pour" property="og:description" />
        <meta content="🐧svitlana's misc pour" property="twitter:title" />
        <meta content="🐧svitlana's misc pour" property="twitter:description" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
        <style>{`
          .section-spacer {
            height: 800px;
            display: block;
            clear: both;
          }
          .misc-content ul {
            margin-bottom: 2em;
          }
        `}</style>
      </Head>
      <div className="page-wrapper">
        <Header />
        <div className="section blog">
          <div className="container-medium-768px w-container">
            <div className="div-block-5 misc-content">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
} 