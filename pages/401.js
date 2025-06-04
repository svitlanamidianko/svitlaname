import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Custom401() {
  return (
    <>
      <Head>
        <title>Unauthorized</title>
        <meta content="Unauthorized" property="og:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <div className="page-wrapper">
        <Header />
        <div className="utility-page-wrap _404">
          <div className="utility-page-content-404 w-form">
            <div className="text-center">
              <div className="_404-title">401</div>
              <h2>unauthorized</h2>
              <div>msg me and i will troubleshoot it: https://t.me/svitlana_mm. thank you🌻.</div>
              <div className="mg-top-24px">
                <a href="/" className="link-primary w-inline-block">
                  <div className="link-primary-wrapper">
                    <div className="link-primary-text">go home</div>
                    <div className="link-primary-text-arrow">&nbsp;&nbsp;<span className="link-primary-arrow"></span></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
} 