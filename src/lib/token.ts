import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

// Set Cookies
export const setAuthCookie = (token: string) => {
  try {
    // Check Token Validation
    if (!isTokenValid(token)) return;

    // Set Token To Cookie
    Cookies.set("auth_token", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    return true;
  } catch {
    toast.error("Invalid token");
    return false;
  }
};

// Check Token Validation
export const isTokenValid = (token: string) => {
  try {
    // Basic JWT structure validation
    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      return false;
    }

    const decoded = jwtDecode(token);
    return decoded.exp && Date.now() < decoded.exp * 1000;
  } catch {
    return false;
  }
};

// Get token with validation
export const getValidatedToken = () => {
  const token = Cookies.get("auth_token");
  if (!token || !isTokenValid(token)) {
    deleteAuthCookie();
    return null;
  }
  return token;
};

// Delete Cookies
export const deleteAuthCookie = () => {
  Cookies.remove("auth_token");
};
