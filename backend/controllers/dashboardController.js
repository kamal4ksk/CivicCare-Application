import Post from "../models/Post.js";
import User from "../models/User.js";

// @desc    Get dashboard metrics / counts
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const totalPosts = await Post.countDocuments();
    const pendingPosts = await Post.countDocuments({ status: "Pending" });
    const ongoingPosts = await Post.countDocuments({ status: "Ongoing" });
    const resolvedPosts = await Post.countDocuments({ status: "Resolved" });

    // User specific counts
    const myTotalPosts = await Post.countDocuments({ userId: req.user._id });
    const myPendingPosts = await Post.countDocuments({
      userId: req.user._id,
      status: "Pending",
    });
    const myOngoingPosts = await Post.countDocuments({
      userId: req.user._id,
      status: "Ongoing",
    });
    const myResolvedPosts = await Post.countDocuments({
      userId: req.user._id,
      status: "Resolved",
    });

    res.json({
      global: {
        total: totalPosts,
        pending: pendingPosts,
        ongoing: ongoingPosts,
        resolved: resolvedPosts,
      },
      user: {
        total: myTotalPosts,
        pending: myPendingPosts,
        ongoing: myOngoingPosts,
        resolved: myResolvedPosts,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getDashboardStats };
