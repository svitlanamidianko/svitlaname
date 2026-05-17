import { useState, useEffect, useRef, useCallback } from 'react'

const MEDIA_FILES = [
  '/images/index%20photos/tree-reaching.png',
  '/images/index%20photos/pendeluming.mp4',
  '/images/index%20photos/pretty.png',
  '/images/index%20photos/redwood.png',
  '/images/index%20photos/linkedin.png',
  '/images/index%20photos/old.jpeg',
  '/images/index%20photos/kid.jpg',
  '/images/index%20photos/nose.jpg',
  '/images/index%20photos/yoga%20sunset.jpg',
  '/images/index%20photos/yoga.png',
  '/images/index%20photos/faith.JPG',
  '/images/index%20photos/bday%20me.png',
  '/images/index%20photos/gentle%20me.png',
  '/images/index%20photos/life%20artist.png',
  '/images/index%20photos/sunset%20nyc.png',
  '/images/index%20photos/balloomn.mp4',
]

const isVideoSrc = (src) => src.endsWith('.mp4')

const Slideshow = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeLayer, setActiveLayer] = useState(0)
  const [layer0Src, setLayer0Src] = useState(MEDIA_FILES[0])
  const [layer1Src, setLayer1Src] = useState(MEDIA_FILES[1])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const video0Ref = useRef(null)
  const video1Ref = useRef(null)

  const getVideoRef = (layerId) => (layerId === 0 ? video0Ref : video1Ref)

  const pauseVideo = useCallback((layerId) => {
    const video = getVideoRef(layerId).current
    if (!video) return
    video.pause()
  }, [])

  // Start the incoming (back) video from 0 when crossfade begins — never while hidden
  const startBackVideo = useCallback(() => {
    const backLayer = activeLayer === 0 ? 1 : 0
    const backSrc = backLayer === 0 ? layer0Src : layer1Src
    if (!isVideoSrc(backSrc)) return

    const video = getVideoRef(backLayer).current
    if (!video) return
    video.currentTime = 0
    video.play().catch(() => {})
  }, [activeLayer, layer0Src, layer1Src])

  // Keep front video playing; pause the hidden back layer so it doesn't run ahead
  useEffect(() => {
    const frontLayer = activeLayer
    const backLayer = activeLayer === 0 ? 1 : 0
    const frontSrc = frontLayer === 0 ? layer0Src : layer1Src
    const backSrc = backLayer === 0 ? layer0Src : layer1Src

    if (isVideoSrc(backSrc)) pauseVideo(backLayer)

    if (!isVideoSrc(frontSrc) || isTransitioning) return
    const video = getVideoRef(frontLayer).current
    if (!video) return
    video.play().catch(() => {})
  }, [
    activeLayer,
    layer0Src,
    layer1Src,
    isTransitioning,
    pauseVideo,
  ])

  useEffect(() => {
    if (!isTransitioning) return
    startBackVideo()
  }, [isTransitioning, startBackVideo])

  // 5s hold + 2s crossfade
  useEffect(() => {
    let fadeTimeoutId
    const intervalId = setInterval(() => {
      setIsTransitioning(true)
      if (fadeTimeoutId) clearTimeout(fadeTimeoutId)
      fadeTimeoutId = setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % MEDIA_FILES.length
          const upcoming = MEDIA_FILES[(next + 1) % MEDIA_FILES.length]
          setActiveLayer((layer) => {
            const newActive = 1 - layer
            if (newActive === 0) setLayer1Src(upcoming)
            else setLayer0Src(upcoming)
            return newActive
          })
          return next
        })
        setIsTransitioning(false)
      }, 2000)
    }, 5000)

    return () => {
      clearInterval(intervalId)
      if (fadeTimeoutId) clearTimeout(fadeTimeoutId)
    }
  }, [])

  const layerClass = (layerId) => {
    const isFront = activeLayer === layerId
    if (isTransitioning) {
      return `slideshow-media ${isFront ? 'front fade-out' : 'back fade-in'}`
    }
    return `slideshow-media ${isFront ? 'front visible' : 'back hidden'}`
  }

  const renderLayer = (layerId, src) => {
    if (isVideoSrc(src)) {
      return (
        <video
          ref={getVideoRef(layerId)}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          className={layerClass(layerId)}
        />
      )
    }
    return <img src={src} alt="" className={layerClass(layerId)} />
  }

  return (
    <div className={`slideshow-container ${className || ''}`}>
      {renderLayer(0, layer0Src)}
      {renderLayer(1, layer1Src)}

      <style jsx>{`
        .slideshow-container {
          position: relative;
          width: 298px;
          height: 298px;
          overflow: hidden;
          background: #e0e0e0;
          border-radius: 12px;
        }

        .slideshow-container :global(.slideshow-media) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: opacity 2s ease-in-out, filter 2s ease-in-out;
        }

        .slideshow-container :global(.front) {
          z-index: 1;
        }

        .slideshow-container :global(.back) {
          z-index: 2;
        }

        .slideshow-container :global(.visible) {
          opacity: 1;
          filter: blur(0px);
        }

        .slideshow-container :global(.hidden) {
          opacity: 0;
          filter: blur(0px);
          pointer-events: none;
        }

        .slideshow-container :global(.fade-in) {
          opacity: 1;
          filter: blur(0px);
        }

        .slideshow-container :global(.fade-out) {
          opacity: 0;
          filter: blur(1px);
        }
      `}</style>
    </div>
  )
}

export default Slideshow
