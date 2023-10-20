import React, { useState, useRef, useEffect } from "react"

const FilmCard = ({ film }) => {
  const [showVideoIndex, setShowVideoIndex] = useState(null)
  const videoRefs = useRef([])

  const toggleVideo = (index) => {
    if (showVideoIndex === index) {
      setShowVideoIndex(null)
    } else {
      setShowVideoIndex(index)
      const videoElement = videoRefs.current[index]
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen()
      }
    }
  }

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setShowVideoIndex(null)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && typeof showVideoIndex === "number") {
        setShowVideoIndex(null)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [showVideoIndex])

  return (
    <div className="fullCard">
      {showVideoIndex !== null ? (
        <div
          onClick={() => toggleVideo(showVideoIndex)}
          className="card-container"
        >
          <div
            ref={(el) => (videoRefs.current[showVideoIndex] = el)}
            className="video-container"
          >
            <iframe
              width="560"
              height="315"
              src={`//www.youtube.com/embed/${film[showVideoIndex].url}?controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
            <button onClick={closeFullscreen} className="close-button">
              Close
            </button>
          </div>
        </div>
      ) : (
        film.map((film, index) => (
          <div key={index} onClick={() => toggleVideo(index)}>
            <div className="indFilm">
              <img src={film.thumbnail} alt={film.title} />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default FilmCard
