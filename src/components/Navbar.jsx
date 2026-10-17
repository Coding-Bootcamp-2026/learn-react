import { Link, NavLink } from "react-router";

function navLinkClass({ isActive }) {
  return isActive
    ? 'font-semibold text-blue-600'
    : 'text-gray-600 hover:text-blue-600';
}

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  )
}