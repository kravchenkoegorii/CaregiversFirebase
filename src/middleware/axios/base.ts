import { InternalAxiosRequestConfig } from "axios";

export const handleRequestFulfilled = (config:  InternalAxiosRequestConfig<any>) => {
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

  config.url += `?key=${apiKey}`;

  return config;
};