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

export const googleHelper = ({ fn, msg }) => {
  if (localStorage.getItem('expiry') < Date.now()) {
    this.$swal.fire({
      icon: 'warning',
      title: `Please log in to Google to ${msg}!`,
      showCancelButton: true,
      confirmButtonText: 'Log In'
    }).then(result => {
      if (result.isDismissed) {
        return;
      }
      loginToGoogle({ fn });
    });
  } else {
    fn();
  }
}

export default loginToGoogle;