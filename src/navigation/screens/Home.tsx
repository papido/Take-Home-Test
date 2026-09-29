import { Button, Text } from '@react-navigation/elements';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export function Home() {
  const { user, logout } = useAuth();
  const [error, setError] = useState('');

  async function handleLogout() {
    setError('');

    try {
      await logout();
    } catch {
      setError('Could not log out. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#f3f6fb',
    padding: 24,
  },
  title: {
    color: '#172033',
    fontSize: 28,
    fontWeight: '700',
  },
  email: {
    color: '#5e687a',
    fontSize: 16,
  },
  error: {
    color: '#b42318',
    fontSize: 14,
  },
});
