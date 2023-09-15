import axios from 'axios';

export const callPost = async url => {
  const token = localStorage.getItem('token');
  if (!token) throw 'Not Authorized!';

  const headers = getHeader(token);
  const fullUrl = process.env.VUE_APP_BASE_URL + url;

  console.log(`Calling POST to ${fullUrl}`);
  const response = await axios.post(fullUrl, {}, { headers });
  return response;
}

export const getHeader = token => ({
  'AccessToken': token
});