import { useEffect, useState } from "react";
import { postJSON } from "../../store/api";

export default function Reset() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    setToken(t);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await postJSON("/api/auth/reset", { token, password });
      setDone(true);
    } catch {
      alert("Şifre sıfırlama başarısız oldu.");
    }
  };

  if (!token) return <div className="auth-card"><p>Geçersiz bağlantı.</p></div>;

  return (
    <div className="auth-card">
      <h1>Reset password</h1>
      {done ? (
        <p>Şifreniz güncellendi. Giriş yapabilirsiniz.</p>
      ) : (
        <form onSubmit={submit} className="auth-form">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Change</button>
        </form>
      )}
    </div>
  );
}
