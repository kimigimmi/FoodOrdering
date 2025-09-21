import { useState } from "react";
import { API_URL, postJSON } from "../../lib/api";
import "../../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await postJSON("/api/auth/login", { email, password });
      window.location.href = "/";
    } catch (e: any) {
      setErr(e?.message || "Login failed");
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
      <h1>Sign in</h1>
      <form onSubmit={submit} className="auth-form">
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
        <button type="submit" className="primary">Sign in</button>
      </form>

      <div className="divider">or</div>

      <button className="oauth" onClick={loginWithGoogle}>
        <span>Continue with Google</span>
      </button>
      <button className="oauth" onClick={loginWithMicrosoft}>
        <span>Continue with Microsoft</span>
      </button>
    </div>
  );
}
