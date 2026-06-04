import Poll from "../models/Poll.js";

export const getPublicStats =
  async (req, res) => {
    try {
      const totalPolls =
        await Poll.countDocuments();

      const activePolls =
        await Poll.countDocuments({
          is_published: false,
        });

      res.status(200).json({
        success: true,

        stats: {
          totalPolls,

          activePolls,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };