import { useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../api";
import PostForm from "../components/PostForm";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(form) {
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const data = await apiFetch('/posts', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      navigate(`/posts/${data.data.id}`);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tulis Post Baru</h1>

      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      <PostForm 
        onSubmit={handleCreate}
        errors={errors}
        loading={loading}
        submitLabel="Terbitkan"
      />
    </div>
  )
}