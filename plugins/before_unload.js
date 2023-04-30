export default ({ app }) => {
    window.addEventListener('beforeunload', function(event) {
        this.localStorage.removeItem('auth._token.local')
        this.alert('hehh')
  })}
