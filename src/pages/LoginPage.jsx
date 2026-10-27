import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const successMessage = location.state?.message;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      login(data.token, data.user);
      navigate('/');
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
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>

      {successMessage && (
        <p className="mb-4 rounded-md bg-green-100 px-4 py-3 text-green-800">
          {successMessage}
        </p>
      )}

      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password[0]}
            </p>
          )}
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Memproses...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register di sini
        </Link>
      </p>
    </div>
  )
}