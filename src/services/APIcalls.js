import axios from "axios";
import { API_BASE_URL } from "../constants";

export const getQuestions = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/questions`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getQuestionById = async id => {
  try {
    const result = await axios.get(`${API_BASE_URL}/questions/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const voteOnChoice = async url => {
  try {
    const result = await axios.post(`${API_BASE_URL + url}`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const addNewQuestion = async body => {
  try {
    const result = await axios.post(`${API_BASE_URL}/questions`, body, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
