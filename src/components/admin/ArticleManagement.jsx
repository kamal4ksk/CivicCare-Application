import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { AdminArticleCard } from './AdminArticlecard';
import { CreateArticleModal } from './CreateArticle';
import { EditArticleModal } from './EditArticlemodal';

/**
 * Component 112 - Article Management (page)
 * Top-level page composing 113 (article cards grid), 114 (create modal),
 * and 115 (edit modal).
 *
 * Props:
 *  - initialArticles?: array (see 113_AdminArticleCard for shape)
 */
export function ArticleManagementPage({ initialArticles = exampleArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (article) => {
    setArticles((prev) => [
      { ...article, id: `art-${Date.now()}`, createdAt: new Date(), imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400' },
      ...prev,
    ]);
  };

  const handleUpdate = (id, updates) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const handleDelete = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Article Management</h1>
          <p className="text-gray-500">Create and manage educational resources for citizens</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Article
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article, i) => (
          <AdminArticleCard
            key={article.id}
            article={article}
            onEdit={setEditingArticle}
            onDelete={handleDelete}
            delay={i * 0.05}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10 col-span-full">No articles found</p>
        )}
      </div>

      <CreateArticleModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSubmit={handleCreate} />
      <EditArticleModal isOpen={!!editingArticle} article={editingArticle} onClose={() => setEditingArticle(null)} onSubmit={handleUpdate} />
    </div>
  );
}

export default ArticleManagementPage;

// --- Example usage / mock data --------------------------------------------
export const exampleArticles = [
  {
    id: 'art-1', title: 'How to Report a Pothole', category: 'pothole',
    description: 'A step-by-step guide on reporting road damage to local authorities effectively.',
    imageUrl: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=400', createdAt: new Date('2026-05-01'),
  },
  {
    id: 'art-2', title: 'Understanding Your Water Rights', category: 'water',
    description: 'Learn about your rights regarding municipal water supply and how to escalate issues.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400', createdAt: new Date('2026-05-10'),
  },
  {
    id: 'art-3', title: 'Reporting Bribery Safely', category: 'bribe',
    description: 'A guide for citizens on how to safely and anonymously report corruption incidents.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400', createdAt: new Date('2026-05-15'),
  },
];