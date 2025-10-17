import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/store/slices/authSlice';
import Home from '../src/screens/Home';

const mockNavigation = {
  navigate: jest.fn(),
};

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('Home Screen', () => {
  it('renders correctly', () => {
    const store = createMockStore({ auth: { token: 'mock-token', user: { id: 1, email: 'test@example.com' } } });
    const { getByText } = render(
      <Provider store={store}>
        <Home navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Mini CRM')).toBeTruthy();
    expect(getByText('Welcome to the Mini CRM App!')).toBeTruthy();
  });

  it('navigates to CustomerList on button press', () => {
    const store = createMockStore({ auth: { token: 'mock-token', user: { id: 1, email: 'test@example.com' } } });
    const { getByText } = render(
      <Provider store={store}>
        <Home navigation={mockNavigation} />
      </Provider>
    );

    const button = getByText('Manage Customers');
    fireEvent.press(button);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('CustomerList');
  });

  it('navigates to Dashboard on button press', () => {
    const store = createMockStore({ auth: { token: 'mock-token', user: { id: 1, email: 'test@example.com' } } });
    const { getByText } = render(
      <Provider store={store}>
        <Home navigation={mockNavigation} />
      </Provider>
    );

    const button = getByText('Dashboard');
    fireEvent.press(button);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Dashboard');
  });
});
