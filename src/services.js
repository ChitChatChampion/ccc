export const getUrl = url => `${process.env.VUE_APP_BASE_URL}/${url}`;

export const getHeader = () => ({
  'Access-Token': localStorage.getItem('token')
})

