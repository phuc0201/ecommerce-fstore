import axios from "axios";
const client = axios.create({
  baseURL: "https://api.nbphuoc.xyz",
});
export default client;
