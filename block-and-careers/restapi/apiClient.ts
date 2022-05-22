import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001/",

  timeout: 10000000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Orisgin": "*",
    Accept: "application/json",
  },
});

export default client;
