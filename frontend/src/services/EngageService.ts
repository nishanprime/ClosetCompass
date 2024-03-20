import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/posts";

const like = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/like`, form_data);

  return data?.data;
};

const unlike = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/unlike`, form_data);

  return data?.data;
};

const dislike = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/dislike`, form_data);

  return data?.data;
};

const undislike = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/undislike`, form_data);

  return data?.data;
};

const my_likes = async () => {
  const { data } = await axios.get(`${API_URL}/my-likes`);

  return data?.data;
};

const my_dislikes = async () => {
  const { data } = await axios.get(`${API_URL}/my-dislikes`);

  return data?.data;
};

export default {
  like,
  dislike,
  unlike,
  undislike,
  my_likes,
  my_dislikes,
};
