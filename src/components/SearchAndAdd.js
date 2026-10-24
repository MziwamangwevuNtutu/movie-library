import React, { useState } from 'react';
import axios from 'axios';
import { addMovie } from '../apiService';

const SearchAndAdd = ({ onMovieAdded }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const OMDB_KEY = "f067e6d5"; 

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;
    setError("");
    try {
     
const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`);   
  setResults(data.Search || []);
    } catch (error) {
      console.error("Search failed", error);
      setError("Movie search failed. Please try again.");
    }
  };

  const handleAddToLibrary = async (movie) => {
    try {
      setError("");

      const { data: details } = await axios.get("https://www.omdbapi.com/", {
        params: { apikey: OMDB_KEY, i: movie.imdbID, plot: "short" }
      });

      if (details.Response === "False") {
        throw new Error(details.Error || "Could not load movie details.");
      }

      const newMovie = {
        imdbID: details.imdbID,
        Title: details.Title,
        Year: details.Year,
        Genre: details.Genre,
        Director: details.Director,
        Poster: details.Poster,
        imdbRating: details.imdbRating
      };

      await addMovie(newMovie);
      onMovieAdded(); 
      setResults([]);
      setQuery("");
    } catch (error) {
      console.error("Could not save to Java backend", error);
      setError("Could not add this movie. Check that the backend is running and allows requests from this app.");
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

      {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}

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