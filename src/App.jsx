import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

export default function App() {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />

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