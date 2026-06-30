import Community from '../models/Community.js';
import User from '../models/User.js';

// @desc    Create new community
// @route   POST /api/communities
// @access  Private
export const createCommunity = async (req, res, next) => {
  const { name, description, category, location, icon, color, isOfficial } = req.body;

  if (!name || !description || !category) {
    res.status(400);
    return next(new Error('Please enter name, description and category'));
  }

  try {
    // Pre-join the creator
    const community = await Community.create({
      name,
      description,
      category,
      location: location || "",
      icon: icon || "🏡",
      color: color || "from-purple-500 to-indigo-600",
      isOfficial: isOfficial || req.user.role === 'admin',
      creatorId: req.user._id,
      members: [req.user._id]
    });

    res.status(201).json(community);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all communities
// @route   GET /api/communities
// @access  Private/Public
export const getCommunities = async (req, res, next) => {
  try {
    const communities = await Community.find({})
      .populate('creatorId', 'name email role')
      .populate('members', 'name email role');
    res.json(communities);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle Join/Leave a community
// @route   POST /api/communities/:id/join
// @access  Private
export const toggleJoinLeave = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      res.status(404);
      return next(new Error('Community not found'));
    }

    const isJoined = community.members.some(
      (mId) => mId.toString() === req.user._id.toString()
    );

    if (isJoined) {
      // Leave community
      community.members = community.members.filter(
        (m) => m.toString() !== req.user._id.toString()
      );
    } else {
      // Join community
      community.members.push(req.user._id);
    }

    await community.save();
    res.json({ joined: !isJoined, membersCount: community.members.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Update community properties
// @route   PUT /api/communities/:id
// @access  Private/Admin
export const updateCommunity = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      res.status(404);
      return next(new Error('Community not found'));
    }

    // Allow admin or creator
    if (req.user.role !== 'admin' && community.creatorId.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error('User not authorized to edit this community'));
    }

    community.name = req.body.name || community.name;
    community.description = req.body.description || community.description;
    community.category = req.body.category || community.category;
    community.location = req.body.location || community.location;
    community.icon = req.body.icon || community.icon;
    community.color = req.body.color || community.color;
    if (req.body.isActive !== undefined) {
      community.isActive = req.body.isActive;
    }

    const updatedCommunity = await community.save();
    res.json(updatedCommunity);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete community
// @route   DELETE /api/communities/:id
// @access  Private/Admin
export const deleteCommunity = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      res.status(404);
      return next(new Error('Community not found'));
    }

    // Allow admin or creator
    if (req.user.role !== 'admin' && community.creatorId.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error('User not authorized to delete this community'));
    }

    await community.deleteOne();
    res.json({ message: 'Community deleted successfully' });
  } catch (error) {
    next(error);
  }
};
