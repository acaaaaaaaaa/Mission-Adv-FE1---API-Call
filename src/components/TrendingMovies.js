import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieShowcase.css';

const TrendingMovies = ({ allMovies, myMovies, toggleFavorite }) => {
  const carouselRef = useRef(null);

  const trending = allMovies && Array.isArray(allMovies) ? allMovies.filter(movie =>
    movie && movie.category && Array.isArray(movie.category) && movie.category.includes("trending")
  ) : [];

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (!allMovies || allMovies.length === 0) {
    return <section className="continue-section"><h2>Loading data...</h2></section>;
  }
  
  if (trending.length === 0) {
    return <section className="continue-section"><h2>Belum ada film trending.</h2></section>;
  }

  return (
    <section className="trending-section">
      <h2>Film Trending</h2>
      <div className="carousel-wrapper">
        <button className="arrow-btn left" onClick={scrollLeft}>
          <i className="fa fa-chevron-left"></i>
        </button>

        <div className="trending-carousel" ref={carouselRef}>
          {trending.map((item, index) => (
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

export default TrendingMovies;
