import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { EMOJI_OPTIONS, COVER_OPTIONS } from './AdminCreatecommunity';

const categoryOptions = ['General', 'Roads', 'Water', 'Electricity', 'Environment', 'Safety'];

/**
 * Component 128 - Admin Edit Community Modal
 *
 * Props:
 *  - isOpen: boolean
 *  - community: { id, name, description, emoji, cover, category, location, isPrivate } | null
 *  - onClose: () => void
 *  - onSubmit: (id, updates) => void
 */
export function AdminEditCommunityModal({ isOpen, community, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);
  const [cover, setCover] = useState(COVER_OPTIONS[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [location, setLocation] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (community) {
      setName(community.name || '');
      setDescription(community.description || '');
      setEmoji(community.emoji || EMOJI_OPTIONS[0]);
      setCover(community.cover || COVER_OPTIONS[0]);
      setCategory(community.category || categoryOptions[0]);
      setLocation(community.location || '');
      setIsPrivate(!!community.isPrivate);
    }
  }, [community]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!community) return;
    onSubmit(community.id, { name, description, emoji, cover, category, location, isPrivate });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && community && (
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
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Edit Community</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Cover preview */}
              <div className={`h-24 rounded-xl bg-gradient-to-br ${cover} flex items-center justify-center text-4xl`}>
                {emoji}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Emoji</label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJI_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`text-2xl p-2 rounded-xl border-2 transition-all ${
                        emoji === e ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Cover Gradient</label>
                <div className="flex gap-2 flex-wrap">
                  {COVER_OPTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCover(c)}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${c} ring-offset-2 transition-all ${
                        cover === c ? 'ring-2 ring-gray-900' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Community Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm text-gray-600">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-900">Private Community</p>
                  <p className="text-xs text-gray-500">Only invited members can join</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrivate((v) => !v)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${isPrivate ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isPrivate ? 'translate-x-5' : ''}`} />
                </button>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminEditCommunityModal;
