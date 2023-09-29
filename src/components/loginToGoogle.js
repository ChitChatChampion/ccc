import { googleTokenLogin } from 'vue3-google-login';

const loginToGoogle = ({ redirect, router, fn }) => {
  googleTokenLogin().then(tokenResponse => {
    localStorage.setItem('token', tokenResponse.access_token);

    // get user data from Google
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
      .then(userDataResponse => userDataResponse.json())
      .then(data => {
        localStorage.setItem('name', data.name);
        localStorage.setItem('expiry', Date.now() + 3600000);
        if (redirect && router) {
          router.push(redirect);
        } else {
          location.reload();
        }
        if (fn) {
          fn();
        }
      });
  });
}

export default loginToGoogle;