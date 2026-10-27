import { useState } from "react";

export default function PostForm({
  initialData = { title: '', body: '' },
  onSubmit,
  errors = {},
  loading = false,
  submitLabel = 'Simpan',
}) {
  const [form, setForm] = useState(initialData);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="title" className="mb-1 block font-medium">
          Judul
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block font-medium">
          Isi Post
        </label>
        <textarea
          id="body"
          name="body"
          rows="8"
          value={form.body}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">
            {errors.body[0]}
          </p>
        )}
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Menyimpan...' : submitLabel}
      </button>
    </form>
  );
}