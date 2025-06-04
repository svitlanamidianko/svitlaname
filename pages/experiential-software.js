import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExperientialSoftware() {
  return (
    <>
      <Head>
        <title>svitlana's experiential software 💻</title>
        <meta content="svitlana's experiential software 💻" name="description" />
        <meta content="svitlana's experiential software 💻" property="og:title" />
        <meta content="svitlana's experiential software 💻" property="og:description" />
        <meta content="svitlana's experiential software 💻" property="twitter:title" />
        <meta content="svitlana's experiential software 💻" property="twitter:description" />
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

              <p>svitlana has home-cooked a few software projects that she is working on putting up here. coming soon:3</p>
              <p> Check out [the project](https://svitlana.mmm.page/elements) that Esther and I play!</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
} 