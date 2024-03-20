import axios from "axios";

const API_URL = import.meta.env.VITE_API_URI + "/outfit";



const getAllOutfits = async (query: {
  search: string;
  page: number;
  page_size: number;
  sort_by: string;
  sort_order: "ASC" | "DESC";
}) => {
  const { data } = await axios.get(`${API_URL}/all`, { params: query });

  return data?.data;
};

const getOneOutfit = async (outfitId: string) => {
  const { data } = await axios.get(`${API_URL}/${outfitId}`);
  return data?.data;
};

const deleteOutfitById = async (outfitId: string) => {
  const { data } = await axios.delete(`${API_URL}/${outfitId}`);
  return data?.data;
};

export default {
  getOneOutfit,
  getAllOutfits,
  deleteOutfitById,
};
