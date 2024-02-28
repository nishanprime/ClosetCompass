import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/auth";

const login = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/login`, form_data);

  return data?.data;
};

const register = async (form_data: any) => {
  const { data } = await axios.post(`${API_URL}/register`, form_data);

  return data?.data;
};

const me = async () => {
  const { data } = await axios.get(`${API_URL}/me`);

  return data?.data;
};

const logout = async () => {
  await axios.get(`${API_URL}/logout`);

  return true;
};

export default {
  login,
  register,
  me,
  logout,
};
