// Tek yerden API kökü
// CRA için REACT_APP_ değişkenini, yoksa localhost'u kullanıyoruz.
const RAW = (process.env.REACT_APP_API_URL || "http://localhost:8080").trim();
// Sondaki / işaretlerini temizle
export const API_URL = RAW.replace(/\/+$/, "");

type Json = Record<string, any>;

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });

  if (!res.ok) {
    const txt = (await res.text().catch(() => "")) || res.statusText;
    throw new Error(txt);
  }
  // 204 No Content ise JSON yoktur
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export function getJSON<T>(path: string) {
  return request<T>(path, { method: "GET" });
}

export function postJSON<T>(path: string, body?: Json) {
  return request<T>(path, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}
