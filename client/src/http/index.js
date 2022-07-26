import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_MY_URL,
});

export { $host };
