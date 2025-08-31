import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const movieService = {
  async getAllMovies() {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  },

  async getMoviesByCategory(category) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      const movies = response.data || [];
      return movies.filter(movie => 
        movie.category && movie.category.includes(category)
      );
    } catch (error) {
      console.error('Error fetching movies by category:', error);
      return [];
    }
  },

  async searchMovies(keyword) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      const movies = response.data || [];
      return movies.filter(movie => 
        movie.title && movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  async addMovie(movieData) {
    try {
      const newMovie = {
        id: Date.now(), 
        ...movieData
      };
      
      console.log('Film baru ditambahkan:', newMovie);
      alert('Film berhasil ditambahkan! (Simulasi)');
      
      return newMovie;
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Gagal menambahkan film');
      return null;
    }
  },

  async updateMovie(id, updateData) {
    try {
      const updatedMovie = {
        id,
        ...updateData
      };
      
      console.log('Film berhasil diupdate:', updatedMovie);
      alert('Film berhasil diupdate! (Simulasi)');
      
      return updatedMovie;
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Gagal mengupdate film');
      return null;
    }
  },

  async deleteMovie(id) {
    try {
      console.log(`Film dengan ID ${id} berhasil dihapus`);
      alert('Film berhasil dihapus! (Simulasi)');
      
      return { success: true, id };
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Gagal menghapus film');
      return { success: false };
    }
  }
};

export const userService = {
  async getAllUsers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return { success: true, data: response.data || [] };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: error.message, data: [] };
    }
  },

  async getUserById(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { success: false, error: error.message };
    }
  },

  async createUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUser(userId, updateData) {
    try {
      console.log('Updating user:', userId, 'with data:', updateData);
      const currentUserResponse = await axios.get(`${API_BASE_URL}/users/${userId}`);
      const currentUser = currentUserResponse.data;
      const updatedUser = { ...currentUser, ...updateData };
      
      if (!updatedUser.myMovies) {
        updatedUser.myMovies = currentUser.myMovies || [];
      }
      
      console.log('Updated user data:', updatedUser);
      
      const response = await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser);
      console.log('Update response:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response) {
        return { success: false, error: error.response.data?.message || error.response.statusText };
      } else if (error.request) {
        return { success: false, error: 'Gagal terhubung ke server' };
      } else {
        return { success: false, error: error.message || 'Terjadi kesalahan' };
      }
    }
  },

  async deleteUser(userId) {
    try {
      console.log('Deleting user:', userId);
      
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
      console.log('Delete response:', response.status);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response) {
        return { success: false, error: error.response.data?.message || error.response.statusText };
      } else if (error.request) {
        return { success: false, error: 'Gagal terhubung ke server' };
      } else {
        return { success: false, error: error.message || 'Terjadi kesalahan' };
      }
    }
  },

  async loginUser(email, password) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?email=${email}&password=${password}`);
      const users = response.data;
      if (users.length > 0) {
        return { success: true, data: users[0] };
      } else {
        return { success: false, error: 'Email atau password salah' };
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUserFavorites(userId, favoriteMovies) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${userId}`, {
        myMovies: favoriteMovies
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating user favorites:', error);
      return { success: false, error: error.message };
    }
  }
};
