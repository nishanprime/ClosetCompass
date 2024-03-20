import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/posts";

const post = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/add`, form_data);

  return data?.data;
};

export default {
  post,
};
