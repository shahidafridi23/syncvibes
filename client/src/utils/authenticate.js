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
    return userData;
  } catch (error) {
    throw error;
  }
};

export default authenticate;
