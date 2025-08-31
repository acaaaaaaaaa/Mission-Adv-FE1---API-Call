import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieService } from '../../services/movieService';

const initialState = {
  movies: [],
  myMovies: [],
  loading: false,
  error: null,
  searchResults: [],
  isSearching: false
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieService.getAllMovies();
      return movies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (keyword, { rejectWithValue }) => {
    try {
      const results = await movieService.searchMovies(keyword);
      return { keyword, results };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMoviesByCategory = createAsyncThunk(
  'movies/getMoviesByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const movies = await movieService.getMoviesByCategory(category);
      return { category, movies };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMyMovies: (state, action) => {
      state.myMovies = action.payload;
    },
    
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.myMovies.find(m => m.id === movie.id)) {
        state.myMovies.push(movie);
      }
    },    
    removeFromFavorites: (state, action) => {
      const movieId = action.payload;
      state.myMovies = state.myMovies.filter(m => m.id !== movieId);
    },    
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const existingIndex = state.myMovies.findIndex(m => m.id === movie.id);
      
      if (existingIndex >= 0) {
        state.myMovies.splice(existingIndex, 1);
      } else {
        state.myMovies.push(movie);
      }
    },    
    resetMovies: (state) => {
      state.movies = [];
      state.myMovies = [];
      state.searchResults = [];
      state.loading = false;
      state.error = null;
      state.isSearching = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movies = [];
      })
      
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.results;
        state.error = null;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload;
        state.searchResults = [];
      })      
      .addCase(getMoviesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoviesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getMoviesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearSearch,
  setMyMovies,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  resetMovies
} = movieSlice.actions;

export const selectAllMovies = (state) => state.movies.movies;
export const selectMyMovies = (state) => state.movies.myMovies;
export const selectMoviesLoading = (state) => state.movies.loading;
export const selectMoviesError = (state) => state.movies.error;
export const selectSearchResults = (state) => state.movies.searchResults;
export const selectIsSearching = (state) => state.movies.isSearching;

export default movieSlice.reducer;
