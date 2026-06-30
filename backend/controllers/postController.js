import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// @desc    Get all posts / search / filter
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    // Category matching
    if (category && category !== "All") {
      // Handle frontend groups matching DB category tags
      if (category === "Sanitation") {
        query.category = { $in: ["Waste", "Garbage", "Sanitation"] };
      } else if (category === "Corruption") {
        query.category = { $in: ["Bribery", "Corruption"] };
      } else {
        query.category = category;
      }
    }

    // Keyword search matching
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
      ];
    }

    let postsQuery = Post.find(query).populate("userId", "name email");

    // Sorting
    if (sort === "Popular") {
      postsQuery = postsQuery.sort({ "likes.length": -1, createdAt: -1 });
    } else {
      postsQuery = postsQuery.sort({ createdAt: -1 }); // default: latest
    }

    const posts = await postsQuery;
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name email")
      .populate("likes", "name");

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      next(new Error("Post not found"));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  const { title, category, location, description, isAnonymous, priority } = req.body;

  try {
    let photoPath = null;
    if (req.file) {
      // Store relative path URL e.g. /uploads/filename.jpg
      photoPath = `/uploads/${req.file.filename}`;
    }

    const post = new Post({
      userId: req.user._id,
      title,
      category,
      location,
      description,
      isAnonymous: isAnonymous === "true" || isAnonymous === true,
      priority: priority || "Medium",
      photo: photoPath,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  const { title, category, location, description, isAnonymous, priority, removePhoto } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }

    // Check ownership or admin status
    if (post.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403);
      return next(new Error("Not authorized to update this concern"));
    }

    post.title = title || post.title;
    post.category = category || post.category;
    post.location = location || post.location;
    post.description = description || post.description;
    post.priority = priority || post.priority;
    if (isAnonymous !== undefined) {
      post.isAnonymous = isAnonymous === "true" || isAnonymous === true;
    }

    if (removePhoto === "true" || removePhoto === true) {
      post.photo = null;
    }

    if (req.file) {
      post.photo = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }

    // Check ownership or admin
    if (post.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(403);
      return next(new Error("Not authorized to delete this concern"));
    }

    await post.deleteOne();
    res.json({ message: "Concern removed successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's posts
// @route   GET /api/posts/my-posts
// @access  Private
const getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle post like reaction
// @route   POST /api/posts/:id/like
// @access  Private
const toggleLikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }

    const likedIndex = post.likes.indexOf(req.user._id);

    if (likedIndex > -1) {
      // Unlike
      post.likes.splice(likedIndex, 1);
      await post.save();
      res.json({ liked: false, likesCount: post.likes.length });
    } else {
      // Like
      post.likes.push(req.user._id);
      await post.save();

      // Create a notification for the owner if liked by someone else
      if (post.userId.toString() !== req.user._id.toString()) {
        await Notification.create({
          userId: post.userId,
          title: "New reaction on your post",
          description: `${req.user.name} liked your post: "${post.title}"`,
          type: "like",
        });
      }

      res.json({ liked: true, likesCount: post.likes.length });
    }
  } catch (error) {
    next(error);
  }
};

export {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  toggleLikePost,
};
