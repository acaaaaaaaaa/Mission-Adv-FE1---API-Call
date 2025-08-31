import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMyMovies } from './store/redux/movieSlice';
import { fetchUsers, setCurrentUser, updateUserFavorites, logoutUser } from './store/redux/userSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyList from './pages/MyList';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResetPassword from './pages/ResetPass';
import GoogleRegister from './pages/GoogleRegist';

function App() {
  const dispatch = useDispatch();  
  const allMovies = useSelector(state => state.movies.movies);
  const myMovies = useSelector(state => state.movies.myMovies);
  const users = useSelector(state => state.users.users);
  const currentUser = useSelector(state => state.users.currentUser);
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && users.length > 0) {
      const userId = JSON.parse(storedUserId);
      const user = users.find(u => u.id === userId);
      if (user) {
        dispatch(setCurrentUser(user));
      }
    }
  }, [dispatch, users]);

  useEffect(() => {
    if (currentUser && allMovies.length > 0 && currentUser.myMovies) {
      const userMovies = allMovies.filter(movie => 
        currentUser.myMovies.includes(movie.id)
      );
      dispatch(setMyMovies(userMovies));
    } else if (!currentUser) {
      dispatch(setMyMovies([]));
    }
  }, [currentUser, allMovies, dispatch]);





  const handleLogout = () => {
    localStorage.removeItem('userId');
    dispatch(logoutUser());
  };
  
  const toggleFavorite = async (movie) => {
    if (!currentUser) return alert("Silakan login dulu.");
    
    try {
      const currentMyMovies = currentUser.myMovies || [];
      const isFavorite = myMovies.some(m => m.id === movie.id);
      const newMyMovies = isFavorite
        ? currentMyMovies.filter(id => id !== movie.id)
        : [...currentMyMovies, movie.id];      
      dispatch(updateUserFavorites({ userId: currentUser.id, favoriteMovies: newMyMovies }));      
      const updatedMovies = isFavorite
        ? myMovies.filter(m => m.id !== movie.id)
        : [...myMovies, movie];
      
      dispatch(setMyMovies(updatedMovies));
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Gagal mengupdate daftar favorit");
    }
  };

  return (
    <Router>
      <Navbar user={currentUser} onLogout={handleLogout} />
      <div style={{ paddingTop: '60px', backgroundColor: '#141414', minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path="/" element={<Dashboard allMovies={allMovies} myMovies={myMovies} toggleFavorite={toggleFavorite} />} />
                                  <Route path="/my-list" element={isLoggedIn ? <MyList myMovies={myMovies} toggleFavorite={toggleFavorite} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register-google" element={<GoogleRegister />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;