import axios from "axios";
import BASE_URL from "./env";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
  }
});


export default fetcher;