import api from "../lib/axios";

export const getPublicStats =
  async () => {
    try {
      const response =
        await api.get(
          "/public/stats"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to fetch public stats",
        }
      );
    }
  };