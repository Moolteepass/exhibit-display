import { useState } from "react"
import "./App.css"
import FilmCard from "./components/FilmCard"

import films from "./assets/films.json"

function App() {
  const [search, setSearch] = useState("")

  // Filter films based on search term
  const filteredFilms = films.filter((films) => {
    return (
      films.title.toLowerCase().includes(search.toLowerCase()) ||
      films.student.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="App">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by Title or Name..."
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="false"
          id="searchbar"
        />
      </div>
      <FilmCard film={filteredFilms} />
      <p className="press-close">Press "Close" to go back to the other films</p>
    </div>
  )
}

export default App
