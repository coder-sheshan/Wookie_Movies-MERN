import axios, { AxiosRequestHeaders } from "axios";

export const Axios = axios.create({
  baseURL: "https://fortunesoft-service.onrender.com/api/v1/user",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("signedJWT");
  console.log(token)
  if (token) {
    // let parseToken = JSON.parse(token);
    // console.log(parseToken);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      //clear the  token from zustand  persist
      localStorage.removeItem("signedJWT");
    }
    return Promise.reject(error);
  }
);

