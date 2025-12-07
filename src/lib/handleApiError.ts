import toast from "react-hot-toast";

export function handleApiError(err: unknown) {
  const message = err instanceof Error ? err.message : "Something went wrong";
  toast.error(message);
}
