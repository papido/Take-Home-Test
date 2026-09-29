import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type {
  AuthContextValue,
  AuthUser,
  LoginInput,
  SignupInput,
} from "../types/auth";

type MockAccount = AuthUser & {
  password: string;
};

const AUTH_USER_KEY = "auth-user";

const AuthContext = createContext<AuthContextValue | null>(null);

function isAuthUser(value: unknown): value is AuthUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string" &&
    "email" in value &&
    typeof value.email === "string"
  );
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accounts, setAccounts] = useState<MockAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const savedUser = await AsyncStorage.getItem(AUTH_USER_KEY);

        if (savedUser) {
          const parsedUser: unknown = JSON.parse(savedUser);
          if (isAuthUser(parsedUser)) {
            setUser(parsedUser);
          } else {
            await AsyncStorage.removeItem(AUTH_USER_KEY);
          }
        }
      } catch {
        await AsyncStorage.removeItem(AUTH_USER_KEY).catch(() => undefined);
      } finally {
        setIsLoading(false);
      }
    }

    void loadUser();
  }, []);

  async function login(input: LoginInput) {
    const email = input.email.trim().toLowerCase();
    const account = accounts.find(
      (account) =>
        account.email === email && account.password === input.password,
    );

    if (!account) {
      throw new Error("Incorrect email or password.");
    }

    const loggedInUser = { name: account.name, email };
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }

  async function signup({ name, email, password }: SignupInput) {
    const formatEmail = email.trim().toLowerCase();

    if (accounts.some((account) => account.email === formatEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const newAccount: MockAccount = {
      name: name.trim(),
      email: formatEmail,
      password: password,
    };

    const signedUpUser = { name: newAccount.name, email: formatEmail };
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(signedUpUser));
    setAccounts((currentAccounts) => [...currentAccounts, newAccount]);
    setUser(signedUpUser);
  }

  async function logout() {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  }

  const value: AuthContextValue = { user, login, signup, logout };

  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
