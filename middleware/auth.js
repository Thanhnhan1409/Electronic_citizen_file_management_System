

export default function ({app,redirect}) {
//     if (localStorage.getItem('auth._token.local') == null) {
    if (!app.$auth.loggedIn) {
      alert("chua")
      return redirect('/login');
  }
    // }
    
  }

// export default function ({store, redirect}) {
//     if (getVal == null) {
//       console.log('tesst')
//       return redirect('/login')
//     }
//   }