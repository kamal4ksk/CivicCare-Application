import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, default: "" },
  icon: { type: String, default: '🏡' },
  color: { type: String, default: 'from-purple-500 to-indigo-600' },
  isOfficial: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const Community = mongoose.model('Community', communitySchema);
export default Community;
