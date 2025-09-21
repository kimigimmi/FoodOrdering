import { useEffect, useState } from "react";
import { getJSON } from "../../store/api";

export default function Verify() {
  const [msg, setMsg] = useState("Verifying...");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token") || "";
    (async () => {
      try {
        await getJSON(`/api/auth/verify?token=${encodeURIComponent(token)}`);
        setMsg("Hesabınız doğrulandı.");
      } catch {
        setMsg("Doğrulama başarısız.");
      }
    })();
  }, []);

  return (
    <div className="auth-card">
      <h1>{msg}</h1>
    </div>
  );
}
