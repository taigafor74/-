import axios from "axios";
const baseURL = "http://localhost:3000/api";
const request = axios.create({
  baseURL: baseURL,
});
export default request;
