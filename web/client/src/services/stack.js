import axios from 'axios';
// Must be a relative path!!
const baseUrl = '/api/stack';

// fetches all. currently unused
const getMaster = async () => {
  const res = await axios.get(`${baseUrl}/all`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

const getStrong = async () => {
  const res = await axios.get(`${baseUrl}/strong`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

export default {
  getMaster,
  getStrong,
};
