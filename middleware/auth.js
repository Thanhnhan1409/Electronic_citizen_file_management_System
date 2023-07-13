
export default function ({ route, redirect }) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!loggedIn) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return redirect('/login')
  }
}