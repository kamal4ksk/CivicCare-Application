import { useState } from 'react';
import { WhatsAppPostCard } from './WhatsappPostcard';

/**
 * Component 110 - WhatsApp Posts
 * Filter tabs (All / New / Converted) + grid of message cards (111).
 *
 * Props:
 *  - messages: array of message objects (see 111_WhatsAppPostCard for shape)
 *  - onConvert: (messageId, category) => void
 */
export function WhatsAppPosts({ messages = [], onConvert }) {
  const [filter, setFilter] = useState('all');

  const filtered = messages.filter((m) => {
    if (filter === 'new') return !m.converted;
    if (filter === 'converted') return m.converted;
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'converted', label: 'Converted' },
  ];

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((message) => (
          <WhatsAppPostCard key={message.id} message={message} onConvert={onConvert} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10 col-span-full">No messages</p>
        )}
      </div>
    </div>
  );
}

export default WhatsAppPosts;