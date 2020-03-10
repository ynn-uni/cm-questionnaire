const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  role: state => state.user.userInfo && state.user.userInfo.type
}
export default getters
