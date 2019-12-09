import axios from "axios";
import { API_BASE_URL } from "../constants";

export const getQuestionsAPI = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/questions`);
    return result.data;
  } catch (error) {
    return error;
  }
};
