import Head from 'next/head';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Writing() {
  useEffect(() => {
    window.CustomSubstackWidget = {
      substackUrl: "svitlanamm.substack.com",
      placeholder: "hibeautiful@email.com",
      buttonText: "subscribe 📪",
      theme: "custom",
      colors: {
        primary: "#f7811b",
        input: "#ffffff",
        email: "#000000",
        text: "#FFFFFF",
      },
    };
    const script = document.createElement('script');
    script.src = 'https://substackapi.com/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.SubstackFeedWidget = {
      substackUrl: "svitlanamm.substack.com",
      posts: 6,
      layout: "center",
      hidden: ["reactions", "comments"],
    };
    const feedScript = document.createElement('script');
    feedScript.src = 'https://substackapi.com/embeds/feed.js';
    feedScript.async = true;
    document.body.appendChild(feedScript);
    return () => {
      document.body.removeChild(feedScript);
    };
  }, []);

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
              <h3>here are some of my recent writings 🌲</h3>
              <div id="substack-feed-embed" style={{ display: "flex", justifyContent: "center", marginTop: 32 }}></div>
              <br></br>
              <br></br>
              <br></br>
              <p>and hey by the way, you can also...</p>
              <div id="custom-substack-embed" style={{ display: "flex", justifyContent: "center", marginTop: 32 }}></div>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
} 