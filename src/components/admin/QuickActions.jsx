import { Users, MessageCircle, FileText, FolderTree, Plus } from 'lucide-react';
import { QuickActionButton } from './ManageUsers';

/**
 * Component 94 - Quick Actions
 * "Quick Actions" section shown on the Admin Dashboard.
 *
 * Props:
 *  - onNavigate: (page) => void   called with 'users' | 'whatsapp' | 'articles' | 'categories'
 */
export function QuickActions({ onNavigate }) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <QuickActionButton
          icon={Users}
          iconColor="text-blue-600"
          title="Manage Users"
          description="View and edit user accounts"
          onClick={() => onNavigate?.('users')}
        />
        <QuickActionButton
          icon={MessageCircle}
          iconColor="text-green-600"
          title="WhatsApp Messages"
          description="Convert messages to posts"
          onClick={() => onNavigate?.('whatsapp')}
        />
        <QuickActionButton
          icon={FileText}
          iconColor="text-purple-600"
          title="Manage Articles"
          description="Create and edit resources"
          onClick={() => onNavigate?.('articles')}
        />
        <QuickActionButton
          icon={FolderTree}
          iconColor="text-amber-600"
          title="Add Category"
          description="Create new issue categories"
          onClick={() => onNavigate?.('categories')}
        />
        <QuickActionButton
          icon={Plus}
          iconColor="text-indigo-600"
          title="Create Article"
          description="Add educational resources"
          onClick={() => onNavigate?.('articles')}
        />
      </div>
    </div>
  );
}

export default QuickActions;