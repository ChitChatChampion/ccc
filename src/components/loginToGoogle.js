import { googleTokenLogin } from 'vue3-google-login';

const loginToGoogle = ({ redirect, router }) => {
  googleTokenLogin().then(tokenResponse => {
    localStorage.setItem('token', tokenResponse.access_token);

    // get user data from Google
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
      .then(userDataResponse => userDataResponse.json())
      .then(data => {
        localStorage.setItem('name', data.name);
        localStorage.setItem('expiry', Date.now() + 3600000);
        router.push(redirect);
        this.$swal.fire({
          toast: true,
          position: 'bottom',
          icon: 'success',
          title: 'Field has been deleted!',
          showConfirmButton: false,
          timer: 1500
        });
      });
  });
}

export default loginToGoogle;