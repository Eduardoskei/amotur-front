import axios from "axios";
import { MapInfo } from "@/data/place";

export const getPlaces = async () => {
    const response = await axios.get<MapInfo>('http://localhost:3000/places');
    console.log(response.data)
    return response.data
}