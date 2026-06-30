import Article from '../models/Article.js';

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private/Admin
export const createArticle = async (req, res, next) => {
  const { title, description, category, content, imageUrl } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    return next(new Error('Please provide title, description and category'));
  }

  try {
    const article = await Article.create({
      title,
      description,
      category,
      content: content || "",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
      creatorId: req.user._id
    });
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
export const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({}).populate('creatorId', 'name email');
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private/Admin
export const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404);
      return next(new Error('Article not found'));
    }

    article.title = req.body.title || article.title;
    article.description = req.body.description || article.description;
    article.category = req.body.category || article.category;
    article.content = req.body.content || article.content;
    article.imageUrl = req.body.imageUrl || article.imageUrl;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404);
      return next(new Error('Article not found'));
    }

    await article.deleteOne();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
};
