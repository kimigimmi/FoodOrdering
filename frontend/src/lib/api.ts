// frontend/src/lib/api.ts

// CRA (react-scripts) kullanıyorsan env değişkenleri REACT_APP_ ile başlar.
// .env.development.local içinde REACT_APP_API_URL tanımlıysa onu, yoksa 8080'i kullan.
export const API_URL =
  (process.env.REACT_APP_API_URL as string) || "http://localhost:8080";

/** Basit yardımcı: HTTP error’ları throw eder */
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    // Sunucunun döndürdüğü hata mesajı varsa al
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {
      /* yoksay */
    }
    throw new Error(msg);
  }

  // No content durumunu destekle
  if (res.status === 204) return undefined as unknown as T;

  return (await res.json()) as T;
}

/** GET helper */
export function getJSON<T>(path: string): Promise<T> {
  return request<T>(path, { method: "GET" });
}

/** POST helper */
export function postJSON<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/** PUT helper (gerekirse) */
export function putJSON<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/** DELETE helper (gerekirse) */
export function delJSON<T>(path: string): Promise<T> {
  return request<T>(path, { method: "DELETE" });
}
