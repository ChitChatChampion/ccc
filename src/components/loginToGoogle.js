import { googleTokenLogin } from 'vue3-google-login';

const loginToGoogle = ({ redirect, router }) => {
  googleTokenLogin().then(tokenResponse => {
    console.log(tokenResponse.access_token);
    localStorage.setItem('token', tokenResponse.access_token);

    // get user data from Google
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
      .then(userDataResponse => userDataResponse.json())
      .then(data => {
        localStorage.setItem('name', data.name);
        localStorage.setItem('expiry', Date.now() + 3600000);
        router.push(redirect);
      });
  });
}

export default loginToGoogle;