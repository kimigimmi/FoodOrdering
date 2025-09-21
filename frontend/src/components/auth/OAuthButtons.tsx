import { API_URL } from "../../lib/api";
import "./auth.css";

export default function OAuthButtons() {
  const go = (provider: "google" | "microsoft") => {
    // İSTENEN: istek backend’e (8080) gitsin
    window.location.href = `${API_URL}/api/oauth/${provider}`;
  };

  return (
    <div className="oauth-buttons" style={{ display: "grid", gap: 10 }}>
      <button className="oauth_btn" onClick={() => go("google")}>
        Continue with Google
      </button>

      <button className="oauth_btn" onClick={() => go("microsoft")}>
        Continue with Microsoft
      </button>
    </div>
  );
}
