import axios from "axios";

const authenticate = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No Token Found");
    }

    const response = await axios.get("/auth/profile");

    if (response.status !== 200) {
      throw new Error("Inavlid Token");
    }

    const userData = response.data;

    return { isAuthenticated: true, user: userData };
  } catch (error) {
    console.error("Authentication error:", error);
    return { isAuthenticated: false, user: null };
  }
};

export default authenticate;
