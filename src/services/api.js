import axios from "axios";

const api = axios.create({
  baseURL: "http://34.205.73.65/users", // IMPORTANTE: esta debe ser la base correcta
});

export default api;
