import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Artsies() {
  return (
    <>
      <Head>
        <title>svitlana's artsies 🌈</title>
        <meta content="Art projects and creative explorations." name="description" />
        <meta content="Artsies" property="og:title" />
        <meta content="Art projects and creative explorations." property="og:description" />
        <meta content="Artsies" property="twitter:title" />
        <meta content="Art projects and creative explorations." property="twitter:description" />
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
              <p>life art to come:3</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
} 