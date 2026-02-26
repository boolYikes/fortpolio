import axios from 'axios';

// not a good idea to use dotenv in a frontend code
// const environment = import.meta.env.EXC_ENV || 'dev';
// environment === 'dev' && import('dotenv').then((module) => module.config())

const url = import.meta.env.MAIL_BACKEND || 'http://mail_proxy:3456';

// fetches all. currently unused
const sendMail = async ({ to, subject, content }) => {
  // ts's got me good for sure ...
  // const payload = {to, subject, content};// prolly should validate
  try {
    const res = await axios.post(`${url}/send`, { to, subject, content });
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export default {
  sendMail,
};
