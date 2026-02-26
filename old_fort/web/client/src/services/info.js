import axios from 'axios';

// TODO: Conditionally choose env (.env for dev, compose env for prod)
// const url = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_BACKEND_PORT}`;
const url = `${import.meta.env.BASE_URL}api/info`; // or just do api/info without leading slash
// const url = '/api/info';

const getMaster = async () => {
  const res = await axios.get(`${url}/1`);
  return res.data;
};

export default {
  getMaster,
};
