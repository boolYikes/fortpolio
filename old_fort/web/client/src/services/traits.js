import axios from 'axios';
// Must be a relative path!!
const url = `${import.meta.env.BASE_URL}api/traits`;
// const url = '/api/traits';

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
