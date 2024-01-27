import axios from "axios";

import { handleRequestFulfilled } from "./base";


export const tokenAxiosInstance = axios.create({
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  }
});

tokenAxiosInstance.interceptors.request.use(handleRequestFulfilled);