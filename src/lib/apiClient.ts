const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    console.log(data.message);

    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
}
