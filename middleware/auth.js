export default function ({ app, redirect }) {
  //     if (localStorage.getItem('auth._token.local') == null) {
  if (!app.$auth.loggedIn) {
    alert("chua");
    console.log("test middleware");
    return redirect(app.$auth.options.redirect.home);
  }
  const token = localStorage.getItem("auth._token.local");
  if (!token) {
    // Nếu giá trị auth._token.local không tồn tại trong localStorage, thì chuyển hướng người dùng đến trang đăng nhập
    return redirect(app.$auth.options.redirect.home);
  }

  // }
}

// export default function ({store, redirect}) {
//     if (getVal == null) {
//       console.log('tesst')
//       return redirect('/login')
//     }
//   }
