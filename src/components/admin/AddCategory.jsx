import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Droplets, Zap, Trash2 as TrashIcon, AlertTriangle, Construction, ShieldAlert, Folder } from 'lucide-react';

export const ICON_OPTIONS = [
  { name: 'Construction', icon: Construction },
  { name: 'Droplets', icon: Droplets },
  { name: 'Zap', icon: Zap },
  { name: 'TrashIcon', icon: TrashIcon },
  { name: 'AlertTriangle', icon: AlertTriangle },
  { name: 'ShieldAlert', icon: ShieldAlert },
  { name: 'Folder', icon: Folder },
];

export const COLOR_OPTIONS = [
  'from-orange-500 to-amber-600',
  'from-blue-500 to-cyan-600',
  'from-yellow-500 to-orange-600',
  'from-green-500 to-emerald-600',
  'from-red-500 to-rose-600',
  'from-purple-500 to-indigo-600',
  'from-gray-500 to-slate-600',
];

/**
 * Component 118 - Add Category Modal
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - onSubmit: (category) => void   category: { name, description, icon, color }
 */
export function AddCategoryModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(ICON_OPTIONS[0].name);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  const reset = () => {
    setName('');
    setDescription('');
    setIcon(ICON_OPTIONS[0].name);
    setColor(COLOR_OPTIONS[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, icon, color });
    reset();
    onClose();
  };

  const PreviewIcon = ICON_OPTIONS.find((o) => o.name === icon)?.icon || Folder;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Add Category</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Live preview */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className={`p-3 bg-gradient-to-br ${color} rounded-xl`}>
                  <PreviewIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{name || 'Category Name'}</p>
                  <p className="text-sm text-gray-500">{description || 'Description preview'}</p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., Road Maintenance"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Short description"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {ICON_OPTIONS.map(({ name: iconName, icon: IconComp }) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setIcon(iconName)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        icon === iconName ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <IconComp className="w-5 h-5 text-gray-700" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Color Theme</label>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${c} ring-offset-2 transition-all ${
                        color === c ? 'ring-2 ring-gray-900' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
                >
                  Add Category
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddCategoryModal;
