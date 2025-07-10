import axios from "axios";
import { MapInfo } from "@/data/place";


{/* GET */}
export const getPlaces = async () => {
    const response = await axios.get<MapInfo>('http://localhost:3000/places');
    console.log(response.data)
    return response.data
}


{/* POST */}
export const postPlaces = async (formData: FormData) => {
  try {
    const response = await axios.post('http://localhost:3000/places', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
    console.error("Erro ao enviar formulário:", error.response.data);
    } else {
      console.error("Erro ao enviar formulário:", error.message || error);
    }

    throw error;
  }
};
