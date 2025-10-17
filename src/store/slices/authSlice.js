import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock API functions
const mockLogin = async (email, password) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === 'test@example.com' && password === 'password') {
    return { token: 'mock-token', user: { id: 1, email } };
  }
  throw new Error('Invalid credentials');
};

const mockRegister = async (email, password) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { token: 'mock-token', user: { id: 1, email } };
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await mockLogin(email, password);
    await AsyncStorage.setItem('token', response.token);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }) => {
    const response = await mockRegister(email, password);
    await AsyncStorage.setItem('token', response.token);
    return response;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await AsyncStorage.removeItem('token');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
