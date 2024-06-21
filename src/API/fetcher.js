import axios from "axios";


const fetcher = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
  }
});


export default fetcher;