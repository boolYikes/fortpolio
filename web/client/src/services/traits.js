import axios from 'axios';
// Must be a relative path!!
const baseUrl = '/api/traits';

// fetches all. currently unused
const getAll = async () => {
  const res = await axios.get(`${baseUrl}/all`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

export default {
  getAll,
};
