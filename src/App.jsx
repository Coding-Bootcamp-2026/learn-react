import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={
            <p className="text-center text-gray-500">
              404 - Halaman tidak ditemukan
            </p>
          }
          />
        </Routes>
      </main>
    </div>
  );
}