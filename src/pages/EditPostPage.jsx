import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import PostForm from "../components/PostForm";

export default function EditPostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Ambil data post lama untuk mengisi form
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data);
      } catch (err) {
        setMessage(err.status === 404 ? 'Post tidak ditemukan.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // Kirim perubahan data ke API
  async function handleUpdate(form) {
    setErrors({});
    setMessage('');
    setSaving(true);

    try {
      await apiFetch(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });

      navigate(`/posts/${id}`);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center">
      <svg class="animate-spin" width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="#3498db" stroke-width="8" fill="none" stroke-dasharray="200" stroke-linecap="round" />
      </svg>
      <p className="text-gray-500">Memuat data...</p>
    </div>
  );

  if (!post) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{message}</p>
    );
  }

  if (post.user_id !== user.id) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">
        Kamu tidak berhak mengedit post ini.
      </p>
    );
  }

  return (
    <>
      <Link to={`/posts/${id}`} className="text-sm text-blue-600 hover:underline">
        Batal
      </Link>
      <h1 className="mt-4 mb-6 text-3xl font-bold">Edit Post</h1>

      {message && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">      {message}
        </p>
      )}

      <PostForm
        initialData={{ title: post.title, body: post.body }}
        onSubmit={handleUpdate}
        errors={errors}
        loading={saving}
        submitLabel="Simpan Perubahan"
      />
    </>
  );
}