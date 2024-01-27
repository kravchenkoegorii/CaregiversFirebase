import axios from "axios";

import { handleRequestFulfilled } from "./base";


export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL
});

authAxiosInstance.interceptors.request.use(handleRequestFulfilled);