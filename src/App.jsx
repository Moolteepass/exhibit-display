import { useState } from "react"
import "./App.css"
import FilmCard from "./components/FilmCard"
import films from "./assets/films.json"

function App() {
  const [search, setSearch] = useState("")
  const [showVideoIndex, setShowVideoIndex] = useState(null)

  const filteredFilms = films.filter((film) => {
    return (
      film.title.toLowerCase().includes(search.toLowerCase()) ||
      film.student.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="App">
      {showVideoIndex === null && (
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search by Title or Name..."
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="false"
            id="searchbar"
          />
        </div>
      )}
      <FilmCard
        film={filteredFilms}
        setShowVideoIndex={setShowVideoIndex}
        showVideoIndex={showVideoIndex}
        setSearch={setSearch}
        search={search}
      />
      <p className="press-close">Press "Close" to go back to the other films</p>
    </div>
  )
}

export default App
