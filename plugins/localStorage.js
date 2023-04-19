// file: plugins/localStorage.js
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'auth._token.local', // tên key để lưu trữ dữ liệu trong localStorage
  })(store)
}
