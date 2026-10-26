import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function navLinkClass({ isActive }) {
  return isActive
    ? 'font-semibold text-blue-600'
    : 'text-gray-600 hover:text-blue-600';
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-gray-900">
          React Blog
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>

          {user ? (
            <>
              <NavLink to="/posts/create" className={navLinkClass}>
                Tulis Post
              </NavLink>
              <span className="text-sm text-gray-500">Halo, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-500 px-3 py-1.5 text-sm text-white hover:bg-gray-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}