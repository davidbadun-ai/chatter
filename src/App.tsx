type Post = {
  id: number;
  title: string;
  content: string;
  likes: number;
};
import { useState, useEffect } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("chatter");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("chatter", JSON.stringify(posts));
  }, [posts]);

  function addOrUpdatePost() {
    if (!title.trim() || !content.trim()) return;

    if (editId) {
      setPosts(
        posts.map(p =>
          p.id === editId ? { ...p, title, content } : p
        )
      );
      setEditId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
        likes: 0
      };
      setPosts([newPost, ...posts]);
    }

    setTitle("");
    setContent("");
  }

  function deletePost(id) {
    setPosts(posts.filter(p => p.id !== id));
  }

  function likePost(id) {
    setPosts(
      posts.map(p =>
        p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
  }

  function startEdit(post) {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      <h1>🔥 Chatter Pro</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button
        onClick={addOrUpdatePost}
        style={{
          width: "100%",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none"
        }}
      >
        {editId ? "✏️ Update Post" : "➕ Create Post"}
      </button>

      <hr />

      {posts.length === 0 ? (
        <p>No posts yet 🚀</p>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <p>❤️ {post.likes || 0}</p>

            <button onClick={() => likePost(post.id)}>Like</button>

            <button onClick={() => startEdit(post)} style={{ marginLeft: "10px" }}>
              Edit
            </button>

            <button
              onClick={() => deletePost(post.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
