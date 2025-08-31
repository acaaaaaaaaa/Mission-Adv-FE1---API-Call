import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieShowcase.css';

const TopRating = ({ allMovies, myMovies, toggleFavorite }) => {
  const carouselRef = useRef(null);

  const topRated = allMovies && Array.isArray(allMovies) ? allMovies.filter(movie =>
    movie && movie.category && Array.isArray(movie.category) && movie.category.includes("top-rated")
  ) : [];

  console.log('TopRated movies:', topRated.length);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (!allMovies || allMovies.length === 0) {
    return <section className="continue-section"><h2>Loading Data...</h2></section>;
  }

  if (topRated.length === 0) {
    return <section className="continue-section"><h2>Belum ada film top rating.</h2></section>;
  }

   return (
    <section className="top-rating-section">
      <h2>Top Rating Film dan Series Hari Ini</h2>
      <div className="carousel-wrapper">
        <button className="arrow-btn left" onClick={scrollLeft}>
          <i className="fa fa-chevron-left"></i>
        </button>

        <div className="top-carousel" ref={carouselRef}>
          {topRated.map((item) => (
            <div key={item.id} className="movie-card-wrapper">
              <MovieCard 
                movie={item} 
                myMovies={myMovies}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={scrollRight}>
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default TopRating;