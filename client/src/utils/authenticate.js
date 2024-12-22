import axios from "axios";

const authenticate = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found.");
      return { isAuthenticated: false, user: null };
    }

    const response = await axios.get("/auth/profile");

    if (response.status !== 200) {
      console.log("Invalid token.");
      return { isAuthenticated: false, user: null };
    }

    const userData = response.data;
    console.log("User authenticated successfully:", userData);
    return { isAuthenticated: true, user: userData };
  } catch (error) {
    console.error("Authentication error:", error);
    return { isAuthenticated: false, user: null };
  }
};

export default authenticate;
