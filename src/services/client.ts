import axios from "axios";
const client = axios.create({
  // baseURL: "https://api.nbphuoc.xyz",
  baseURL: "http://fstore-nbphuoc.ddns.net:8080/",
});
export default client;
