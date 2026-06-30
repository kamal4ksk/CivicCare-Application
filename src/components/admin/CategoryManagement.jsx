import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { AddCategoryModal } from './AddCategory';
import { EditCategoryModal } from './EditCategory';

/**
 * Component 116 - Category Management (page)
 * Top-level page composing 117 (category cards grid), 118 (add modal),
 * and 119 (edit modal).
 *
 * Props:
 *  - initialCategories?: array (see 117_CategoryCard for shape)
 */
export function CategoryManagementPage({ initialCategories = exampleCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAdd = (category) => {
    setCategories((prev) => [...prev, { ...category, id: `cat-${Date.now()}` }]);
  };

  const handleUpdate = (id, updates) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
          <p className="text-gray-500">Manage issue categories and their properties</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-purple-600 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, i) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={setEditingCategory}
            onDelete={handleDelete}
            delay={i * 0.05}
          />
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10 col-span-full">No categories yet</p>
        )}
      </div>

      <AddCategoryModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSubmit={handleAdd} />
      <EditCategoryModal isOpen={!!editingCategory} category={editingCategory} onClose={() => setEditingCategory(null)} onSubmit={handleUpdate} />
    </div>
  );
}

export default CategoryManagementPage;

// --- Example usage / mock data --------------------------------------------
export const exampleCategories = [
  { id: 'cat-1', name: 'Road Maintenance', description: 'Potholes, road damage, traffic signals', icon: 'Construction', color: 'from-orange-500 to-amber-600' },
  { id: 'cat-2', name: 'Water Supply', description: 'Pipe leakage, water shortage, quality', icon: 'Droplets', color: 'from-blue-500 to-cyan-600' },
  { id: 'cat-3', name: 'Electricity', description: 'Power outages, streetlights, wiring', icon: 'Zap', color: 'from-yellow-500 to-orange-600' },
  { id: 'cat-4', name: 'Waste Management', description: 'Garbage collection, sanitation', icon: 'TrashIcon', color: 'from-green-500 to-emerald-600' },
  { id: 'cat-5', name: 'Bribery/Corruption', description: 'Report corruption incidents', icon: 'AlertTriangle', color: 'from-red-500 to-rose-600' },
  { id: 'cat-6', name: 'Public Safety', description: 'Crime, safety hazards, security', icon: 'ShieldAlert', color: 'from-purple-500 to-indigo-600' },
];
