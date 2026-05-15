import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LOAD USER ON APP START
  useEffect(() => {
    const loadUser =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            setLoading(false);
            return;
          }

          const data =
            await getCurrentUser();

          setUser(data.user);
        } catch (error) {
          console.log(
            error.message
          );

          localStorage.removeItem(
            "token"
          );

          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    loadUser();
  }, []);

  // LOGIN
  const login = async (
    email,
    password
  ) => {
    const data =
      await loginUser({
        email,
        password,
      });

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

    return data;
  };

  // REGISTER
  const register = async (
    name,
    email,
    password
  ) => {
    const data =
      await registerUser({
        name,
        email,
        password,
      });

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

    return data;
  };

  // LOGOUT
  const logout =
    async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.log(
          error.message
        );
      } finally {
        localStorage.removeItem(
          "token"
        );

        setUser(null);
      }
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () =>
  useContext(AuthContext);