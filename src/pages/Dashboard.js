import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ContinueWatching from '../components/ContinueWatching';
import TopRating from '../components/TopRating';
import TrendingMovies from '../components/TrendingMovies';
import NewReleases from '../components/NewReleases';

function Dashboard({ allMovies, myMovies, toggleFavorite }) {

  return (
    <div className="auth-page-das">
      <div className="auth-card-das">
        <HeroBanner />
        <ContinueWatching />

        <TopRating allMovies={allMovies} myMovies={myMovies} toggleFavorite={toggleFavorite} />
        <TrendingMovies allMovies={allMovies} myMovies={myMovies} toggleFavorite={toggleFavorite} />
        <NewReleases allMovies={allMovies} myMovies={myMovies} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
}

export default Dashboard;
