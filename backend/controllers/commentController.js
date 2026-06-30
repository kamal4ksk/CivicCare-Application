import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Public
const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 }); // oldest first
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a comment to a post
// @route   POST /api/comments/:postId
// @access  Private
const addComment = async (req, res, next) => {
  const { text } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }

    const comment = new Comment({
      postId,
      userId: req.user._id,
      text,
    });

    const createdComment = await comment.save();

    // Increment post comments count
    post.commentCount = (post.commentCount || 0) + 1;
    await post.save();

    // Create a notification for the owner if commented by someone else
    if (post.userId.toString() !== req.user._id.toString()) {
      await Notification.create({
        userId: post.userId,
        title: "New comment on your post",
        description: `${req.user.name} commented: "${text}"`,
        type: "comment",
      });
    }

    // Populate user before sending back
    const populatedComment = await Comment.findById(createdComment._id).populate(
      "userId",
      "name email"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

// @desc    Edit own comment
// @route   PUT /api/comments/:commentId
// @access  Private
const updateComment = async (req, res, next) => {
  const { text } = req.body;

  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      return next(new Error("Comment not found"));
    }

    // Check ownership
    if (comment.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error("Not authorized to update this comment"));
    }

    comment.text = text || comment.text;
    const updatedComment = await comment.save();

    const populated = await Comment.findById(updatedComment._id).populate(
      "userId",
      "name email"
    );

    res.json(populated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId
// @access  Private
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      return next(new Error("Comment not found"));
    }

    // Check ownership or admin
    if (comment.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403);
      return next(new Error("Not authorized to delete this comment"));
    }

    const post = await Post.findById(comment.postId);
    if (post) {
      post.commentCount = Math.max(0, (post.commentCount || 1) - 1);
      await post.save();
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getCommentsByPost, addComment, updateComment, deleteComment };
