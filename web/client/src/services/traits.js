import axios from 'axios';
// Must be a relative path!!
// const url = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/traits`;
const url = '/api/traits';

// fetches all. currently unused
const getAll = async () => {
  const res = await axios.get(`${url}/all`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

export default {
  getAll,
};
