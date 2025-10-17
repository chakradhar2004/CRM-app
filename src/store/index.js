import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import leadReducer from './slices/leadSlice';
// Import other reducers later

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    leads: leadReducer,
    // Add other reducers
  },
});
