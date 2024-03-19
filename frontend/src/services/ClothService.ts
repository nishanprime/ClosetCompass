import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/clothe";

const addCloth = async (formData: {
  description: string;
  no_of_wears: number;
  cloth_id: string;
  tags: [string];
}) => {
  console.log("form data")
  console.log(formData)
  const { data } = await axios.post(`${API_URL}/add`, formData);
  return data?.data;
};

const getAllClothes = async (query: {
  search: string;
  page: number;
  page_size: number;
  sort_by: string;
  sort_order: "ASC" | "DESC";
}) => {
  const { data } = await axios.get(`${API_URL}/all`, { params: query });
  return data?.data;
};

const getOneClothe = async (clotheId: string) => {
  const { data } = await axios.get(`${API_URL}/${clotheId}`);
  return data?.data;
};

const deleteClothById = async (clotheId: string) => {
  const { data } = await axios.delete(`${API_URL}/${clotheId}`);
  return data?.data;
};



export default {
  addCloth,
  getOneClothe,
  getAllClothes,
  deleteClothById,
};
