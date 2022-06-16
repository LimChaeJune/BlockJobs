import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,

  timeout: 10000000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Orisgin": "*",
    Accept: "application/json",
  },
});

export default client;
