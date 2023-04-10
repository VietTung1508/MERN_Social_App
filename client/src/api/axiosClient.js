import axios from "axios";

const axiosClient = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
