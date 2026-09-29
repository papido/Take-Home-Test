import { Button, Text } from '@react-navigation/elements';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');

    if (!EMAIL_PATTERN.test(email.trim()) || password.length < 6) {
      setError('Enter a valid email and a password with at least 6 characters.');
      return;
    }

    try {
      await login({ email, password });
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'Unable to log in. Please try again.',
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#7b8494"
          style={styles.input}
          value={email}
        />
        <View style={styles.passwordField}>
          <TextInput
            accessibilityLabel="Password"
            autoCapitalize="none"
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#7b8494"
            secureTextEntry={!showPassword}
            style={[styles.input, styles.passwordInput]}
            value={password}
          />
          <Pressable
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
            onPress={() => setShowPassword((visible) => !visible)}
            style={styles.visibilityButton}
          >
            <Text style={styles.visibilityIcon}>👁️</Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button onPress={handleLogin}>Login</Button>
        <Button screen="Signup" variant="plain">
          Go to Signup
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f3f6fb',
    padding: 24,
  },
  content: {
    gap: 14,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  title: {
    color: '#172033',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    color: '#5e687a',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#d7deea',
    borderRadius: 10,
    borderWidth: 1,
    color: '#172033',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d7deea',
    borderRadius: 10,
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  visibilityButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  visibilityIcon: {
    fontSize: 20,
  },
  error: {
    color: '#b42318',
    fontSize: 14,
  },
});
