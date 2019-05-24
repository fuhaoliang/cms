const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.http.permissions,
  loading: state => state.http.loading,
  loadingShow: state => state.http.loadingShow
}
export default getters

