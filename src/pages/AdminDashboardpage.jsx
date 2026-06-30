import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { AdminDashboard, examplePosts } from '../components/admin/AdminDashboard';
import { getAllPosts } from '../services/postService';

/**
 * Route: /admin/dashboard
 * Renders the Admin Dashboard inside the shared AdminLayout (sidebar).
 */
export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        
        const dbPosts = response.data.map(p => ({
          id: p._id,
          title: p.title,
          author: p.userId?.name || 'Citizen',
          status: p.status === 'Ongoing' ? 'in_progress' : p.status.toLowerCase(),
          createdAt: new Date(p.createdAt)
        }));

        const mergedPosts = [
          ...dbPosts,
          ...examplePosts.filter(e => !dbPosts.some(db => db.title === e.title))
        ];

        setPosts(mergedPosts);
      } catch (error) {
        console.error("Failed to load dashboard posts", error);
        setPosts(examplePosts);
      }
    };

    fetchPosts();
  }, []);

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="dashboard" onNavigate={handleNavigate}>
      <AdminDashboard posts={posts} onNavigate={handleNavigate} />
    </AdminLayout>
  );
}