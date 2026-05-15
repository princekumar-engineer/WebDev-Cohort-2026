import api from "../lib/axios";

// REGISTER
export const registerUser =
  async (data) => {
    try {
      const response =
        await api.post(
          "/auth/register",
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Registration failed",
        }
      );
    }
  };

// LOGIN
export const loginUser =
  async (data) => {
    try {
      const response =
        await api.post(
          "/auth/login",
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Login failed",
        }
      );
    }
  };

// CURRENT USER
export const getCurrentUser =
  async () => {
    try {
      const response =
        await api.get(
          "/auth/me"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to fetch user",
        }
      );
    }
  };

// LOGOUT
export const logoutUser =
  async () => {
    try {
      const response =
        await api.post(
          "/auth/logout"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Logout failed",
        }
      );
    }
  };