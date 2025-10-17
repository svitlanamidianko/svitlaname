import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Writing() {
  return (
    <>
      <Head>
        <title>svitlana's writings 🪶</title>
        <meta content="svitlana's writings 🪶" property="og:title" />
        <meta content="svitlana's writings 🪶" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <div className="page-wrapper">
        <Header />
        <div className="section blog">
          <div className="container-medium-768px w-container">
            <div className="div-block-5">
           
              <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
                <div data-supascribe-embed-id="106284883900" data-supascribe-feed></div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <p>and hey by the way, you can also...</p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
                <div data-supascribe-embed-id="650626461011" data-supascribe-subscribe></div>
              </div>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Script src="https://js.supascribe.com/v1/loader/wc5mOe8Ml1YKdO7ZMWq9EuAChX62.js" strategy="afterInteractive" async />
    </>
  );
} 