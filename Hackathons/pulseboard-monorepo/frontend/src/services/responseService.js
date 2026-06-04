import api from "../lib/axios";

// SUBMIT RESPONSE
export const submitResponse =
  async (pollId, answers) => {
    try {
      const response =
        await api.post(
          `/responses/${pollId}`,
          {
            answers,
          }
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to submit response",
        }
      );
    }
  };