import { Button, Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
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

export function Signup() {
  const { signup } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handleSignup() {
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await signup({ name, email, password });
    } catch (signupError) {
      setError(
        signupError instanceof Error
          ? signupError.message
          : 'Unable to sign up. Please try again.',
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          accessibilityLabel="Name"
          autoCapitalize="words"
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#7b8494"
          style={styles.input}
          value={name}
        />
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
            placeholder="Password (at least 6 characters)"
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

        <Button onPress={handleSignup}>Signup</Button>
        <Button onPress={() => navigation.goBack()} variant="plain">
          Go to Login
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
