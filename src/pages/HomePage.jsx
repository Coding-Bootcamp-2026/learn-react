import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await apiFetch('/posts');
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center">
      <svg class="animate-spin" width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="#3498db" stroke-width="8" fill="none" stroke-dasharray="200" stroke-linecap="round" />
      </svg>
      <p className="text-gray-500">Memuat data...</p>
    </div>
  );
  if (error) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{error}</p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Daftar Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">Belum ada post.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}