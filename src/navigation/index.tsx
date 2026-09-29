import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { Signup } from './screens/Signup';

function useIsSignedIn() {
  return useAuth().user !== null;
}

function useIsSignedOut() {
  return useAuth().user === null;
}

const RootStack = createNativeStackNavigator({
  groups: {
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        Login,
        Signup,
      },
    },
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        Home: createNativeStackScreen({
          screen: Home,
          options: {
            title: 'Home',
          },
        }),
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}
