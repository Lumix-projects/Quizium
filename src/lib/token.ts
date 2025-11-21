import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface DecodedToken {
  userId: string;
  isAdmin: boolean;
  exp: number;
}

// Set token in cookies
export const setAuthCookie = (token: string) => {
  try {
    if (!isTokenValid(token)) return false;

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

// Get user data from token
export const getUserFromToken = (serverToken?: string) => {
  try {
    const token = serverToken || getValidatedToken();
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.userId,
      isAdmin: decoded.isAdmin,
    };
  } catch {
    return null;
  }
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getUserFromToken();
  return user?.isAdmin || false;
};

// Check Token Validation
export const isTokenValid = (token: string) => {
  try {
    if (!token || typeof token !== "string" || token.split(".").length !== 3) {
      return false;
    }

    const decoded = jwtDecode<DecodedToken>(token);
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
