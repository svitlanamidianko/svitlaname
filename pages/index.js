import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>svitlana in your tab.🌻</title>
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
                <p className="paragraph">Hi internet friend,</p>
                <br />
                <p className="paragraph">
                  I am Svitlana, a young Experiential Software technologist. My mission is to cultivate 3C spaces - spaces that are consious, curious, and collective and I am now exploring technology as means to it.
                  <br /><br />Currently, I direct my attention to <a href="https://www.pond.space/"> pond.space</a> - a contemplative space for growing the Self through mindful practice.
                  <br /><br />
                  I seek beauty, growth and self-discovery through yoga, <a href="https://www.instagram.com/svitlana_moves/">movement</a>,  inner work, <a href = "https://svitlanamm.substack.com">writing</a>, consious creative practice, desiging digital and analog experiences.
                  <br /><br />
                  Find me playing under the trees of San Francisco 🌳
                </p>
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