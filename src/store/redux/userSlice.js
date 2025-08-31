import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/movieService';

const initialState = {
  users: [],
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const result = await userService.getAllUsers();
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await userService.createUser(userData);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await userService.loginUser(credentials.email, credentials.password);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserFavorites = createAsyncThunk(
  'users/updateUserFavorites',
  async ({ userId, favoriteMovies }, { rejectWithValue }) => {
    try {
      const result = await userService.updateUserFavorites(userId, favoriteMovies);
      if (result.success) {
        return { userId, favoriteMovies };
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updateData }, { rejectWithValue }) => {
    try {
      const result = await userService.updateUser(userId, updateData);
      if (result.success) {
        return { userId, updateData: result.data };
      } else {
        return rejectWithValue(result.error || 'Gagal mengupdate profile');
      }
    } catch (error) {
      console.error('Error in updateUser thunk:', error);
      return rejectWithValue(error.message || 'Terjadi kesalahan saat update profile');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const result = await userService.deleteUser(userId);
      if (result.success) {
        return { userId };
      } else {
        return rejectWithValue(result.error || 'Gagal menghapus akun');
      }
    } catch (error) {
      console.error('Error in deleteUser thunk:', error);
      return rejectWithValue(error.message || 'Terjadi kesalahan saat menghapus akun');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      // Clear localStorage
      localStorage.removeItem('userId');
    },
    
    updateLocalFavorites: (state, action) => {
      const { userId, favoriteMovies } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.myMovies = favoriteMovies || [];
      }
      if (state.currentUser && state.currentUser.id === userId) {
        state.currentUser.myMovies = favoriteMovies || [];
      }
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    resetUsers: (state) => {
      state.users = [];
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.users = [];
      })      
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        const newUser = action.payload;
        if (!newUser.myMovies) {
          newUser.myMovies = [];
        }
        state.users.push(newUser);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload;
        if (!user.myMovies) {
          user.myMovies = [];
        }
        state.currentUser = user;
        state.isLoggedIn = true;
        state.error = null;
        localStorage.setItem('userId', JSON.stringify(user.id));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserFavorites.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, favoriteMovies } = action.payload;
        const user = state.users.find(u => u.id === userId);
        if (user) {
          user.myMovies = favoriteMovies || [];
        }
        if (state.currentUser && state.currentUser.id === userId) {
          state.currentUser.myMovies = favoriteMovies || [];
        }
        state.error = null;
      })
      .addCase(updateUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, updateData } = action.payload;
        const user = state.users.find(u => u.id === userId);
        if (user) {
          Object.assign(user, updateData);
          // Ensure myMovies is always an array
          if (!user.myMovies) {
            user.myMovies = [];
          }
        }
        if (state.currentUser && state.currentUser.id === userId) {
          Object.assign(state.currentUser, updateData);
          if (!state.currentUser.myMovies) {
            state.currentUser.myMovies = [];
          }
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId } = action.payload;
        // Remove user from users array
        state.users = state.users.filter(u => u.id !== userId);
        // Clear current user if it's the deleted user
        if (state.currentUser && state.currentUser.id === userId) {
          state.currentUser = null;
          state.isLoggedIn = false;
          // Clear localStorage
          localStorage.removeItem('userId');
        }
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setCurrentUser,
  logoutUser,
  updateLocalFavorites,
  clearError,
  resetUsers
} = userSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export const selectUserLoading = (state) => state.users.loading;
export const selectUserError = (state) => state.users.error;

export default userSlice.reducer;
