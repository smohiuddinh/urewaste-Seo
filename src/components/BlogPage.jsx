import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import { PortableText } from "@portabletext/react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{_id, title, body}`)
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Sanity Blog</h1>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-8 p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <PortableText value={post.body} />
          </div>
        ))
      )}
    </div>
  );
}
