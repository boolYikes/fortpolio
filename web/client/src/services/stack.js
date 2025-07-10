import axios from 'axios';
// Must be a relative path!!
// const url = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/stack`;
const url = '/api/stack';

// fetches all. currently unused
const getMaster = async () => {
  const res = await axios.get(`${url}/all`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

const getStrong = async () => {
  const res = await axios.get(`${url}/strong`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

export default {
  getMaster,
  getStrong,
};
