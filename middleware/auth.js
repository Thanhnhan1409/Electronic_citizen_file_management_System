

export default function ({app,redirect}) {
//     if (localStorage.getItem('auth._token.local') == null) {
    if (!app.$auth.loggedIn) {
      alert("chua")
      console.log("test middleware")
      return redirect('/');
  }
    // }
    
  }

// export default function ({store, redirect}) {
//     if (getVal == null) {
//       console.log('tesst')
//       return redirect('/login')
//     }
//   }