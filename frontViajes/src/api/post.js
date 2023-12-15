import { API_URL } from "../utils/consts";

export const getPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }