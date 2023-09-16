export const getUrl = url => `${process.env.VUE_APP_BASE_URL}/${url}`;

export const getHeader = () => ({
  'AccessToken': localStorage.getItem('token')
})