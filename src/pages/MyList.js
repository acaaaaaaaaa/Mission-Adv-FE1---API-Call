import React from 'react';
import MovieCard from '../components/MovieCard';
import './MyList.css'; 

function MyList({ myMovies, toggleFavorite }) {

  return (
    <div className="my-list-container">
      <main className="my-list-page">
        <h1 className="page-title">Daftar Saya</h1>
        

        
        {myMovies && myMovies.length > 0 ? (
          <div className="movie-grid">
            {myMovies.map(movie => (
                             <MovieCard 
                 key={movie.id}
                 movie={movie} 
                 myMovies={myMovies}
                 toggleFavorite={toggleFavorite}
               />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada film favorit. Silakan tambahkan film ke daftar favorit Anda!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyList;