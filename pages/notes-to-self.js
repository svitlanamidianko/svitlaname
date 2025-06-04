import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotesToSelf() {
  return (
    <>
      <Head>
        <title>svitlana's notes to self</title>
        <meta content="Quotes and notes I love." name="description" />
        <meta content="Notes to self" property="og:title" />
        <meta content="Quotes and notes I love." property="og:description" />
        <meta content="Notes to self" property="twitter:title" />
        <meta content="Quotes and notes I love." property="twitter:description" />
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
            {/* The main content from <body> of notes-to-self.html goes here. For brevity, only a sample is shown. Paste the rest as needed. */}
            <div className="div-block-5">
              <h3 className="title blog-post">Self-awareness</h3>
              <ul role="list">
                <li><strong>It's common to believe that life is a series of external experiences. And that we must live an outwardly extraordinary life in order to have something to share. The experience of our inner world is often completely overlooked. — Rick Rubin</strong></li>
                <li>If you don't allow yourself to feel, you're procrastinating truth.</li>
                <li>You can always separate feelings (unchangeable) from thoughts (changeable).</li>
                <li>The biggest obstacle to increasing your self-awareness is the tendency to avoid the discomfort that comes from seeing yourself as you really are. — Travis Bradberry</li>
                <li>"It's a very large leap to go straight from knowing yourself as content (ego, personality, body, thoughts, feelings) to knowing yourself as context (pure presence, sat-chit-ananda, Pistis-Aletheia-Eros)."</li>
              </ul>
            </div>
            {/* ...repeat for all other div-block-5 sections from your HTML... */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
