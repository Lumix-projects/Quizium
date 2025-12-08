const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);

    // Response received but server returned error status
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("API Error:", data?.message || response.statusText);
      throw new Error(
        data?.message || `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    // THIS catches real CORS/network errors
    console.error("NETWORK/CORS ERROR:", error);
    throw error;
  }
}
