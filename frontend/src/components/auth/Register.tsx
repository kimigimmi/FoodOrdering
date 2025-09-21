import { useState } from "react";
import { API_URL, postJSON } from "../../lib/api";
import "../../styles/auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await postJSON("/api/auth/register", { name, email, password });
      setOk(true);
      // istersek anasayfaya
      // window.location.href = "/";
    } catch (e: any) {
      setErr(e?.message || "Register failed");
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/api/oauth/google`;
  };
  const loginWithMicrosoft = () => {
    window.location.href = `${API_URL}/api/oauth/microsoft`;
  };

  return (
    <div className="auth-card">
      <h1>Create account</h1>
      <p className="muted">Siparişlerini takip et, yorum yap, sepetini sakla.</p>

      <form onSubmit={submit} className="auth-form">
        <input
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {err && <div className="error">{err}</div>}
        {ok && <div className="success">Account created!</div>}

        <button type="submit" className="primary">Register</button>
      </form>

      <div className="divider">or</div>

      <button className="oauth" onClick={loginWithGoogle}>
        <span>Continue with Google</span>
      </button>
      <button className="oauth" onClick={loginWithMicrosoft}>
        <span>Continue with Microsoft</span>
      </button>

      <p className="muted small">
        Hesabın var mı? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}
