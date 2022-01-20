import axios from "axios";

export const api = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://nodejs-blogapp.herokuapp.com/",
    headers: {
      Authorization: `Baerer ${token}`,
    },
  });
};
