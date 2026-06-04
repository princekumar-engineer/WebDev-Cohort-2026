import api from "../lib/axios";

// CREATE POLL
export const createPoll =
  async (data) => {
    try {
      const response =
        await api.post(
          "/polls",
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to create poll",
        }
      );
    }
  };

// GET MY POLLS
export const getMyPolls =
  async () => {
    try {
      const response =
        await api.get(
          "/polls/my-polls"
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to fetch polls",
        }
      );
    }
  };

// GET POLL DETAILS
export const getPollById =
  async (pollId) => {
    try {
      const response =
        await api.get(
          `/polls/${pollId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to fetch poll",
        }
      );
    }
  };

// UPDATE POLL
export const updatePoll =
  async (id, data) => {
    try {
      const response =
        await api.patch(
          `/polls/${id}`,
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to update poll",
        }
      );
    }
  };

// DELETE POLL
export const deletePoll =
  async (pollId) => {
    try {
      const response =
        await api.delete(
          `/polls/${pollId}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to delete poll",
        }
      );
    }
  };

// PUBLISH RESULTS
export const publishResults =
  async (id) => {
    try {
      const response =
        await api.patch(
          `/polls/${id}/publish`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Failed to publish results",
        }
      );
    }
  };