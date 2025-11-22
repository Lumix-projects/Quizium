import { AxiosError } from "axios";

export function GetErrorMessage(err: unknown) {
  const error = err as AxiosError<{ message?: string }>;
  const message =
    error.response?.data?.message ?? error.message ?? "Something went wrong";
  return message;
}
