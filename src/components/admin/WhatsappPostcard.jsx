import { motion } from 'motion/react';
import { MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { value: 'pothole', label: 'Road/Pothole' },
  { value: 'water', label: 'Water Supply' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'garbage', label: 'Waste Management' },
  { value: 'bribe', label: 'Bribery/Corruption' },
  { value: 'other', label: 'Other' },
];

/**
 * Component 111 - WhatsApp Post Card
 * Single message card used inside the WhatsApp Posts grid (110).
 *
 * Props:
 *  - message: { id, sender, phone, text, imageUrl?, lat?, lng?, timestamp,
 *                converted: boolean }
 *  - onConvert: (messageId, category) => void
 */
export function WhatsAppPostCard({ message, onConvert }) {
  const [category, setCategory] = useState('other');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all space-y-3"
    >
      {/* Sender */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{message.sender}</p>
          <p className="text-xs text-gray-500">{message.phone}</p>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(message.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Message text */}
      <p className="text-sm text-gray-700">{message.text}</p>

      {/* Optional image */}
      {message.imageUrl && (
        <img src={message.imageUrl} alt="Attachment" className="w-full h-40 object-cover rounded-xl" />
      )}

      {/* Location */}
      {message.lat && message.lng && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-1.5">
          <MapPin className="w-3.5 h-3.5 text-green-600" />
          {message.lat.toFixed(5)}, {message.lng.toFixed(5)}
        </div>
      )}

      {/* Convert action / status */}
      {message.converted ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Successfully converted
        </div>
      ) : (
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <button
            onClick={() => onConvert?.(message.id, category)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Convert to Post
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default WhatsAppPostCard;