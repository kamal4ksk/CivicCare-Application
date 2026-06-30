import User from "../models/User.js";
import Post from "../models/Post.js";

// @desc    Get all users (excluding sensitive info)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle suspension on a user
// @route   PUT /api/admin/users/:id/suspend
// @access  Private/Admin
const toggleSuspendUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    if (user.role === "admin") {
      res.status(400);
      return next(new Error("Admin accounts cannot be suspended"));
    }

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.json({
      message: `User account has been ${user.isSuspended ? "suspended" : "activated"}`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post status (Pending, Ongoing, Resolved)
// @route   PUT /api/admin/posts/:id/status
// @access  Private/Admin
const updatePostStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }

    post.status = status;
    await post.save();

    res.json({ message: "Post status updated successfully", post });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post priority (Low, Medium, High)
// @route   PUT /api/admin/posts/:id/priority
// @access  Private/Admin
const updatePostPriority = async (req, res, next) => {
  const { priority } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }

    post.priority = priority;
    await post.save();

    res.json({ message: "Post priority updated successfully", post });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    if (user.role === "admin") {
      res.status(400);
      return next(new Error("Admin accounts cannot be deleted"));
    }

    await Post.deleteMany({ userId: user._id }); // delete all their posts
    await user.deleteOne();

    res.json({ message: "User and associated concerns removed successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllUsers,
  toggleSuspendUser,
  updatePostStatus,
  updatePostPriority,
  deleteUser,
};
