import { useState } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { WhatsAppPostSummary } from './WhatsappPostsummary';
import { WhatsAppPosts } from './WhatsappPosts';

/**
 * Component 108 - WhatsApp Center (page)
 * Top-level page composing 109 (summary stats), 110 (posts grid + filters),
 * and 111 (individual post card, used inside 110).
 *
 * Props:
 *  - initialMessages?: array of message objects (see 111_WhatsAppPostCard)
 *  - onConvert?: (messageId, category) => void   called in addition to internal state update
 */
export function WhatsAppCenter({ initialMessages = exampleMessages, onConvert }) {
  const [messages, setMessages] = useState(initialMessages);

  const handleConvert = (messageId, category) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, converted: true, category } : m))
    );
    onConvert?.(messageId, category);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Center</h1>
          <p className="text-gray-500">Manage citizen reports received via WhatsApp Business API</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-xl">
          <MessageCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-600">Connected to WhatsApp Business</span>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        </div>
      </div>

      {/* Summary */}
      <WhatsAppPostSummary messages={messages} />

      {/* Posts */}
      <WhatsAppPosts messages={messages} onConvert={handleConvert} />
    </div>
  );
}

export default WhatsAppCenter;

// --- Example usage / mock data --------------------------------------------
export const exampleMessages = [
  {
    id: 'w1', sender: 'Ramesh Kumar', phone: '+91 98765 43210',
    text: 'There is a huge pothole near the bus stop on Gandhi Road, causing accidents.',
    imageUrl: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=400',
    lat: 12.9716, lng: 77.5946, timestamp: new Date('2026-06-12T09:30:00'), converted: false,
  },
  {
    id: 'w2', sender: 'Lakshmi Devi', phone: '+91 91234 56780',
    text: 'No water supply in our area for the last 3 days. Please look into this urgently.',
    lat: 12.9352, lng: 77.6101, timestamp: new Date('2026-06-12T14:10:00'), converted: false,
  },
  {
    id: 'w3', sender: 'Suresh Babu', phone: '+91 99887 76655',
    text: 'Streetlights have not been working on MG Road for over a week now.',
    imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=400',
    timestamp: new Date('2026-06-11T18:45:00'), converted: true, category: 'electricity',
  },
];