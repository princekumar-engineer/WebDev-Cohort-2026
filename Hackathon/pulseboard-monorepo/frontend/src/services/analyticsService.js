import api from "../lib/axios";

// PRIVATE ANALYTICS
export const getAnalytics =
  async (pollId) => {
    try {
      const response =
        await api.get(
          `/analytics/${pollId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to fetch analytics",
        }
      );
    }
  };

// PUBLIC RESULTS
export const getPublicResults =
  async (pollId) => {
    try {
      const response =
        await api.get(
          `/analytics/${pollId}/public-results`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to fetch public results",
        }
      );
    }
  };