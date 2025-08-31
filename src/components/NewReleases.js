import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieShowcase.css';

const NewReleases = ({ allMovies, myMovies, toggleFavorite }) => {
  const carouselRef = useRef(null);

  const newReleases = allMovies && Array.isArray(allMovies) ? allMovies.filter(movie =>
    movie && movie.category && Array.isArray(movie.category) && movie.category.includes("new-release")
  ) : [];

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (!allMovies || allMovies.length === 0) {
    return <section className="new-release-section"><h2>Loading data...</h2></section>;
  }

  return (
    <section className="new-release-section">
      <h2>Rilis Baru</h2>
      <div className="carousel-wrapper">
        <button className="arrow-btn left" onClick={scrollLeft}>
          <i className="fa fa-chevron-left"></i>
        </button>

        <div className="new-carousel" ref={carouselRef}>
          {newReleases.map((item, index) => (
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

export default NewReleases;
