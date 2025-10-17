import { useState, useEffect } from 'react'

const Slideshow = ({ className }) => {
  // Media list (URL-encoded folder name due to space)
  const mediaFiles = [
    '/images/index%20photos/tree-reaching.png',
    '/images/index%20photos/pendeluming.mp4',
    '/images/index%20photos/pretty.png',
    '/images/index%20photos/redwood.png',
    '/images/index%20photos/ghghg.png',
    '/images/index%20photos/linkedin.png',
    '/images/index%20photos/old.jpeg',
    '/images/index%20photos/kid.jpg',
    '/images/index%20photos/nose.jpg',
    '/images/index%20photos/yoga%20sunset.jpg',
    '/images/index%20photos/yoga.png'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 5s total per slide: ~3s hold + 2s crossfade
  useEffect(() => {
    let fadeTimeoutId
    const intervalId = setInterval(() => {
      setIsTransitioning(true)
      fadeTimeoutId = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaFiles.length)
        setIsTransitioning(false)
      }, 2000) // 2s crossfade
    }, 5000) // start transition every 5s (3s hold + 2s fade)

    return () => {
      clearInterval(intervalId)
      if (fadeTimeoutId) clearTimeout(fadeTimeoutId)
    }
  }, [mediaFiles.length])

  const currentFile = mediaFiles[currentIndex]
  const nextFile = mediaFiles[(currentIndex + 1) % mediaFiles.length]
  const isCurrentVideo = currentFile.endsWith('.mp4')
  const isNextVideo = nextFile.endsWith('.mp4')

  return (
    <div className={`slideshow-container ${className}`}>
      {isCurrentVideo ? (
        <video
          key={`current-${currentFile}`}
          src={currentFile}
          autoPlay
          muted
          loop
          playsInline
          className={`slideshow-media current ${isTransitioning ? 'fade-out' : 'visible'}`}
        />
      ) : (
        <img
          key={`current-${currentFile}`}
          src={currentFile}
          alt=""
          className={`slideshow-media current ${isTransitioning ? 'fade-out' : 'visible'}`}
        />
      )}

      {isNextVideo ? (
        <video
          key={`next-${nextFile}`}
          src={nextFile}
          autoPlay
          muted
          loop
          playsInline
          className={`slideshow-media next ${isTransitioning ? 'fade-in' : 'hidden'}`}
        />
      ) : (
        <img
          key={`next-${nextFile}`}
          src={nextFile}
          alt=""
          className={`slideshow-media next ${isTransitioning ? 'fade-in' : 'hidden'}`}
        />
      )}

      <style jsx>{`
        .slideshow-container {
          position: relative;
          width: 298px; /* explicit width prevents flex collapse */
          height: 298px;
          overflow: hidden;
          background: #e0e0e0; /* visible container while debugging */
          border-radius: 12px;
        }

        .slideshow-media {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: opacity 2s ease-in-out, filter 2s ease-in-out;
        }

        .current { z-index: 1; }
        .next { z-index: 2; }

        .visible { opacity: 1; filter: blur(0px); }
        .hidden { opacity: 0; filter: blur(0px); }
        .fade-in { opacity: 1; filter: blur(0px); }
        .fade-out { opacity: 0; filter: blur(1px); }
      `}</style>
    </div>
  )
}

export default Slideshow
