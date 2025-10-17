import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useThemeContext } from '../context/ThemeContext';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Mini CRM" />
        <Card.Content>
          <Text>Welcome to the Mini CRM App!</Text>
          <Button
            mode="contained"
            onPress={() => setIsDarkMode(!isDarkMode)}
            style={styles.button}
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CustomerList')}
            style={styles.button}
          >
            Manage Customers
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Dashboard')}
            style={styles.button}
          >
            Dashboard
          </Button>
          <Button onPress={handleLogout} style={styles.button}>
            Logout
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 10,
  },
  button: {
    marginTop: 10,
  },
});
