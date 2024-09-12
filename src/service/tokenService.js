import { jwtDecode } from "jwt-decode";
import { login } from "../redux/auth/authSlice";

export const getToken = () => localStorage.getItem("token");

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const setUserFromToken = (store) => {
  const token = getToken();
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      store.dispatch(login(decodedToken));
    }
  }
};
