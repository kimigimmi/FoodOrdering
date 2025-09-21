import { useEffect, useState } from "react";
import { getJSON, postJSON } from "../store/api";
import "../styles/Comments.css";

type CommentModel = {
  id: number;
  name: string | null;
  text: string;
  createdAt?: string;
};

export default function Comments() {
  const [items, setItems] = useState<CommentModel[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      const data = await getJSON<CommentModel[]>("/api/comments");
      setItems(data ?? []);
    } catch {
      setError("Couldn't load comments");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const created = await postJSON<CommentModel>("/api/comments", {
        name,
        text,
      });
      if (created) {
        setItems((prev) => [created, ...prev]);
        setText("");
      }
    } catch {
      setError("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cmt">
      <div className="cmt__inner">
        <h1 className="cmt__title">Comments</h1>

        <form className="cmt__card cmt__form" onSubmit={onSubmit}>
          <div className="cmt__row">
            <input
              className="cmt__input"
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="cmt__row" style={{ marginTop: 8 }}>
            <textarea
              className="cmt__textarea"
              placeholder="Comment"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button className="cmt__btn" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          {error && <div className="cmt__error">{error}</div>}
        </form>

        <div className="cmt__card">
          <div className="cmt__list">
            {items.length === 0 && (
              <div className="cmt__empty">No comments yet — be the first!</div>
            )}

            {items.map((c) => (
              <article key={c.id} className="cmt__item">
                <h3 className="cmt__name">{c.name || "Anonymous"}</h3>
                <p className="cmt__text">{c.text}</p>
                {c.createdAt && (
                  <div className="cmt__meta">
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
