import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/files";

const upload = async (formData: any) => {
  const { data } = await axios.post(`${API_URL}/upload`, formData);
  return data?.data;
};

const remove = async (id: string) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`);

    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  remove,
  upload,
};
