import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, myMovies, toggleFavorite }) => {
  if (!movie || !movie.id) {
    console.warn('MovieCard: movie prop tidak valid', movie);
    return null;
  }

  const isFavorite = myMovies && Array.isArray(myMovies) && myMovies.some(favMovie => 
    favMovie && favMovie.id === movie.id
  );

  const handleFavoriteClick = () => {
    if (toggleFavorite && movie) {
      toggleFavorite(movie);
    }
  };

  return (
    <div className="movie-card-grid">
      <img src={movie.image} alt={movie.title} className="card-poster" />
      
      {movie.label && (
        <div className="label-episode-baru">
          {movie.label}
        </div>
      )}

      {movie.top && (
        <div className="label-top-10">
          Top <span className="top-number">{movie.top}</span>
        </div>
      )}

      {/* Tombol Favorit */}
      <div className="favorite-button" onClick={handleFavoriteClick}>
        <i className={`fa fa-heart ${isFavorite ? 'favorite-active' : ''}`}></i>
      </div>
    </div>
  );
};

export default MovieCard;