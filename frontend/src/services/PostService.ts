import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/posts";

const post = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/add`, form_data);

  return data?.data;
};

const get_all_posts = async () => {
  const { data } = await axios.get(`${API_URL}/all`);

  return data?.data;
};

const delete_post = async (post_id: number) => {
  const { data } = await axios.delete(`${API_URL}/${post_id}`);
  return data?.data;
};

export default {
  post,
  get_all_posts,
  delete_post,
};
