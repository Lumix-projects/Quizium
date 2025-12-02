import { cookies } from "next/headers";

export const getServerToken = async () => {
  return (await cookies()).get("auth_token")?.value;
};
