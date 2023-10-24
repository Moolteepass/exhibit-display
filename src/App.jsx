import { useState, useEffect } from "react"
import "./App.css"
import FilmCard from "./components/FilmCard"

function App() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [showVideoIndex, setShowVideoIndex] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseID = "appYslkrm56eePp3o"
        const tableName = "Film List"

        const url = `https://api.airtable.com/v0/${baseID}/${tableName}`

        fetch(url, {
          headers: {
            Authorization:
              "Bearer patoVDA5JuT80vGzv.a6f6d776cd11fcc762c0d64e16e8f7a4471119ef4d6038d757bdcb437d8cbe0e",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data.records.map((record) => record.fields))
            console.log(data.records.map((record) => record.fields))
          })
      } catch (error) {
        console.error("Error fetching JSON:", error)
      }
    }
    fetchData()
  }, [])

  const filteredFilms = data.filter((data) => {
    return (
      (data.title
        ? data.title.toLowerCase().includes(search.toLowerCase())
        : false) ||
      (data.student
        ? data.student.toLowerCase().includes(search.toLowerCase())
        : false)
    )
  })

  const sortedAndFilteredFilms = [...filteredFilms].sort(
    (a, b) => b.rating - a.rating
  )
  console.log(sortedAndFilteredFilms)

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
        film={sortedAndFilteredFilms}
        setShowVideoIndex={setShowVideoIndex}
        showVideoIndex={showVideoIndex}
        setSearch={setSearch}
        search={search}
      />
    </div>
  )
}

export default App
