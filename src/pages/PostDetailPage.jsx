import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { apiFetch } from "../api";

export default function PostDetailPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data); // data post dari api.
      } catch (e) {
        setError(e.status === 404 ? 'Post tidak ditemukan.' : e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

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
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        Kembali
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Dibuat pada{' '}
        {new Date(post.created_at).toLocaleString('id-ID', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}
      </p>
      <p className="mt-6 leading-relaxed whitespace-pre-line">
        {post.body}
      </p>
    </article>
  );
}
