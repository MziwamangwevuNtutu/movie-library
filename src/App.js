import React, { useState } from 'react';
import MovieLibrary from './components/MovieLibrary';
import SearchAndAdd from './components/SearchAndAdd';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleMovieAdded = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Max-width container keeps the content from touching the screen edges */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-extrabold text-blue-500 mb-12 text-center tracking-tighter">
          MOVIE<span className="text-white">HUB</span>
        </h1>
        
        <section className="mb-16">
          <SearchAndAdd onMovieAdded={handleMovieAdded} />
        </section>

        <section>
          <MovieLibrary key={refreshKey} />
        </section>
      </div>
    </div>
  );
}

export default App;