import React, { useState, useEffect } from 'react';
//import { getMovies, deleteMovie } from '../apiService';
import { getMovies, deleteMovie } from '../apiService'; // Use one dot, not two

const MovieLibrary = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies(); 
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
  <div className="p-4 md:p-8 bg-gray-900 min-h-screen text-white">
    <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">My Library</h1>
    
    {/* Grid setup: 1 column on mobile, 3 on tablets, 4 on desktop */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
          
          {/* Poster Section */}
          <div className="relative h-80">
            {/* <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
              alt={movie.Title} 
              className="w-full h-full object-cover"
            /> */}
            <img 
  src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster+Found"} 
  alt={movie.Title} 
  className="w-full h-full object-cover"
  onError={(e) => {
    // If the image fails to load (404), replace it with a placeholder
    e.target.onerror = null; 
    e.target.src = "https://via.placeholder.com/300x450?text=Image+Not+Found";
  }}
/>
          </div>

          {/* Details Section */}
          <div className="p-5 flex-grow">
            <h2 className="text-xl font-bold mb-1 truncate">{movie.Title}</h2>
            <p className="text-gray-400 text-sm mb-4">{movie.Genre} • {movie.Year}</p>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-yellow-400 font-bold">★ {movie.imdbRating}</span>
              <button 
                onClick={() => handleDelete(movie.id)}
                className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Remove
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
);
};

export default MovieLibrary;