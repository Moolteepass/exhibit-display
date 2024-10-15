import { useRef, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

const FilmCard = ({ films, setShowVideoIndex, showVideoIndex, setSearch }) => {
  const videoRef = useRef(null)

  const toggleVideo = useCallback(
    (index) => {
      setShowVideoIndex((prevIndex) => (prevIndex === index ? null : index))
    },
    [setShowVideoIndex]
  )

  const closeFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setSearch("")
    setShowVideoIndex(null)
  }, [setSearch, setShowVideoIndex])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && typeof showVideoIndex === "number") {
        setShowVideoIndex(null)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [showVideoIndex, setShowVideoIndex])

  if (showVideoIndex !== null && films[showVideoIndex]) {
    return (
      <div className="modal">
        <div className="video-container">
          <iframe
            ref={videoRef}
            src={`//www.youtube.com/embed/${films[showVideoIndex].url}?controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&autoplay=1&vq=hd1080`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <div className="iframe-overlay" onClick={closeFullscreen} />
        </div>
        <button onClick={closeFullscreen} className="close-button">
          Close
        </button>
      </div>
    )
  }

  return (
    <div className="fullCard">
      {films.map((film, index) => (
        <div
          key={film.id || index}
          onClick={() => toggleVideo(index)}
          className="indFilm"
        >
          <img src={film.thumbnail[0].url} alt={film.title} />
        </div>
      ))}
    </div>
  )
}

FilmCard.propTypes = {
  films: PropTypes.array.isRequired,
  setShowVideoIndex: PropTypes.func.isRequired,
  showVideoIndex: PropTypes.number,
  setSearch: PropTypes.func.isRequired,
}

export default FilmCard
