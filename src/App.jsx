import { useState, useEffect, useCallback } from "react"
import "./App.css"
import FilmCard from "./components/FilmCard"

const BASE_ID = "appYslkrm56eePp3o"
const TABLE_NAME = "2024"
const API_KEY =
  "patoVDA5JuT80vGzv.a6f6d776cd11fcc762c0d64e16e8f7a4471119ef4d6038d757bdcb437d8cbe0e"

function App() {
  const [search, setSearch] = useState("")
  const [films, setFilms] = useState([])
  const [showVideoIndex, setShowVideoIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true)
      try {
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setFilms(data.records.map((record) => record.fields))
      } catch (error) {
        console.error("Error fetching films:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFilms()
  }, [])

  const filteredAndSortedFilms = useCallback(() => {
    return films
      .filter((film) => {
        const searchLower = search.toLowerCase()
        return (
          film.title?.toLowerCase().includes(searchLower) ||
          film.student?.toLowerCase().includes(searchLower)
        )
      })
      .sort((a, b) => b.rating - a.rating)
  }, [films, search])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="App">
      {showVideoIndex === null && (
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search by Title or Name..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoComplete="off"
            id="searchbar"
          />
        </div>
      )}
      <FilmCard
        films={filteredAndSortedFilms()}
        setShowVideoIndex={setShowVideoIndex}
        showVideoIndex={showVideoIndex}
        setSearch={setSearch}
      />
    </div>
  )
}

export default App
