import axios from "axios";
const SERVER_URL = process.env.SERVER_URL;

export const get = async (path = "") => {
  const res = await axios.get(`${SERVER_URL}${path}`);

  if (res.status !== 200) throw new Error(res.statusText);

  return res.data;
};

export const post = async (payload: {}, path = "") => {
  const res = await axios.post(`${SERVER_URL}${path}`, payload);

  if (res.status !== 200) throw new Error(res.statusText);

  return res.data;
};
