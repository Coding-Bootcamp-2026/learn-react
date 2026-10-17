import { Link } from "react-router";

export default function PostCard({ post }) {
  const excerpt = post.body.lenght > 100 ? post.body.slice(0, 100) + '...' : post.body;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
      <p className="mb-4 text-gray-600">{excerpt}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {new Date(post.created_at).toLocaleDateString('id-ID', {
            dateStyle: 'long',
          })}
        </span>
        <Link
          to={`/posts/${post.id}`}
          className="font-medium text-blue-600 hover:underline">
          Baca selengkapnya...
        </Link>
      </div>
    </article>
  );
}