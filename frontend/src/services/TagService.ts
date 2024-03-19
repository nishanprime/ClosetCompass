import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/tag";

const addTag = async (formData: { tag: string }) => {
  console.log("I am here");
  const { data } = await axios.post(`${API_URL}/add`, formData);
  return data?.data;
};
const getAllTags = async () => {
  console.log("I am here");
  const { data } = await axios.get(`${API_URL}/all`);

  return data?.data;
};

export default {
  addTag,
  getAllTags,
};
