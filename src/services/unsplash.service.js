import axios from "axios";

export const getAll = async (page = 1, limit = 30) => {
  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8&page=${page}&per_page=${limit}`
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getOne = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/${id}?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
