import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, default: "" },
  imageUrl: { type: String, default: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400" },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);
export default Article;
