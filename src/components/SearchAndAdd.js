import React, { useState } from 'react';
import axios from 'axios';

const SearchAndAdd = ({ onMovieAdded }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const OMDB_KEY = "f067e6d5"; 

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      // FIXED: Corrected URL parameters for OMDb
     // const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`);
      // Ensure you use backticks (found next to the number 1 key)
  //const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`);
  // Correct URL structure for OMDb
const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`);   
  setResults(data.Search || []);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleAddToLibrary = async (movie) => {
    // FIXED: Mapping keys to match Java @JsonProperty exactly
    const newMovie = {
      Title: movie.Title,
      Year: movie.Year,
      Genre: "Movie", 
      Director: "N/A", // Placeholder since search results are brief
      Poster: movie.Poster,
      imdbRating: "N/A" 
    };

    try {
      // FIXED: Corrected URL to include /movies context path
      await axios.post("http://localhost:8080/movies/api/movies", newMovie);
      alert(`${movie.Title} added to library!`);
      onMovieAdded(); 
      setResults([]);
      setQuery("");
    } catch (error) {
      console.error("Could not save to Java backend", error);
    }
  };

  return (
    <div className="mb-10">
      <form onSubmit={searchMovies} className="flex gap-2">
        <input 
          className="p-3 rounded bg-gray-800 border border-gray-700 w-full text-white focus:outline-none focus:border-blue-500"
          placeholder="Search OMDb for movies to add..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 px-6 py-2 rounded font-bold text-white hover:bg-blue-700 transition">
          Search
        </button>
      </form>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
        {results.map((m) => (
          <div key={m.imdbID} className="bg-gray-800 p-2 rounded text-center border border-gray-700">
            <img src={m.Poster} alt={m.Title} className="h-40 w-full object-cover rounded" />
            <p className="text-sm mt-2 truncate font-medium">{m.Title}</p>
            <button 
              onClick={() => handleAddToLibrary(m)}
              className="mt-2 text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white w-full"
            >
              + Add to Library
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndAdd;