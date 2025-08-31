import React, { useRef, useState, useEffect } from 'react';
import './ContinueWatching.css';
import axios from 'axios';

const ContinueWatching = () => {
  const carouselRef = useRef(null);

  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContinueWatching = async () => {
      try {
        const response = await axios.get('http://localhost:3001/movies');
        const filteredMovies = response.data.filter(movie =>
          movie.category.includes("continue-watching")
        );
        console.log(filteredMovies);
        setMovie(filteredMovies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContinueWatching();
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  

  if (loading) {
    return <section className="continue-section"><h2>Loading data...</h2></section>;
  }

  if (error) {
    return <section className="continue-section"><h2 style={{ color: 'red' }}>{error}</h2></section>;
  }
  
  if (movies.length === 0) {
    return <section className="continue-section"><h2>Belum ada film yang ditonton.</h2></section>;
  }

  return (
    <section className="continue-section">
      <h2>Melanjutkan Tonton Film</h2>
      <div className="carousel-wrapper">
        <button className="arrow-btn left" onClick={scrollLeft}>
          <i className="fa fa-chevron-left"></i>
        </button>

        <div className="continue-carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-cardm">
              <img src={movie.image} alt={movie.title} />
              {movie.top && (
                <div className="top-label">
                  Top <div className="no">{movie.top}</div>
                </div>
              )}
              {movie.label && (
                <div className="new-label">{movie.label}</div>
              )}
              <div className="movie-overlay">
                <span className="movie-title">{movie.title || 'Tanpa Judul'}</span>
                <span className="movie-rating">⭐ {movie.rating || 'N/A'}/5</span>
              </div>
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

export default ContinueWatching;