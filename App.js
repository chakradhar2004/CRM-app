import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './src/store/slices/authSlice';
import { ThemeProvider, useThemeContext } from './src/context/ThemeContext';
import { MD3LightTheme } from 'react-native-paper';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import CustomerList from './src/screens/CustomerList';
import CustomerDetails from './src/screens/CustomerDetails';
import AddEditCustomer from './src/screens/AddEditCustomer';
import LeadList from './src/screens/LeadList';
import LeadDetails from './src/screens/LeadDetails';
import AddEditLead from './src/screens/AddEditLead';
import Dashboard from './src/screens/Dashboard';

const Stack = createStackNavigator();

function AppContent() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const themeContext = useThemeContext();
  const theme = themeContext?.theme || MD3LightTheme;

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        // Mock user data
        dispatch(login.fulfilled({ token: storedToken, user: { id: 1, email: 'stored@example.com' } }));
      }
    };
    checkToken();
  }, [dispatch]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {token ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="CustomerList" component={CustomerList} />
              <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
              <Stack.Screen name="AddEditCustomer" component={AddEditCustomer} />
              <Stack.Screen name="LeadList" component={LeadList} />
              <Stack.Screen name="LeadDetails" component={LeadDetails} />
              <Stack.Screen name="AddEditLead" component={AddEditLead} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ThemeProvider>
  );
}
