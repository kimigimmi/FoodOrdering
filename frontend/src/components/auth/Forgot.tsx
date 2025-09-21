import { useState } from "react";
import { postJSON } from "../../store/api";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // postJSON tek generic alıyor (response tipi)
      await postJSON<{ ok: boolean }>("/api/auth/forgot", { email });
      setOk(true);
    } catch {
      setOk(false);
      alert("Şu anda bu özellik devre dışı veya bir hata oluştu.");
    }
  };

  return (
    <div className="auth-card">
      <h1>Forgot password</h1>
      {ok ? (
        <p>Eğer e-posta kayıtlıysa sıfırlama bağlantısı gönderildi.</p>
      ) : (
        <form onSubmit={submit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send link</button>
        </form>
      )}
    </div>
  );
}
