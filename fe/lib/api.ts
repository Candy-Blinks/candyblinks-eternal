import axios from "axios";
import { API_URL } from "./constants";

export const API_INSTANCE = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
