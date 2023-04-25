<template>
  <div class="container-lp">
    <div class="header">
      <div class="header--logo">
        <img src="~/static/images/logo.jpg" alt="" />
        <h2>HỆ THỐNG QUẢN LÝ HỒ SƠ ĐIỆN TỬ CÔNG DÂN</h2>
      </div>
      <!-- <div class="header-login"> -->
      <button class="header-login">Đăng kí</button>
      <!-- </div> -->
    </div>
    <div class="navbar">
        <nuxt-link to="">
            <div class="navbar--home link navbar-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                    />
                </svg>
                <span>Trang chủ</span>
            </div>
        </nuxt-link>
        
        <nuxt-link to="">
            <div class="link navbar-item">Thông tin và dịch vụ</div>
        </nuxt-link>
        <nuxt-link to="">
            <div class="link navbar-item">Hỗ trợ</div>
        </nuxt-link>

    </div>
    <div class="content">
        <img src="~/static/images/imageLP.jpg" alt="">
        <p class="context-desc">Với quan điểm công khai, minh bạch, lấy người dân, doanh nghiệp làm trung tâm phục vụ, Hệ thống quản lý hồ sơ điện tử kết nối, cung cấp thông tin về thủ tục hành chính và dịch vụ công trực tuyến; hỗ trợ thực hiện, giám sát, đánh giá việc giải quyết thủ tục hành chính, dịch vụ công trực tuyến và tiếp nhận, xử lý phản ánh, kiến nghị của cá nhân, tổ chức trên toàn quốc.
            <br>
            <br>
            Cá nhân, tổ chức dễ dàng truy cập Cổng Dịch vụ công Quốc gia tại địa chỉ duy nhất www.dichvucong.gov.vn theo nhu cầu người dùng từ máy tính, máy tính bảng hoặc điện thoại di động được kết nối internet để hưởng nhiều lợi ích từ Hệ thống quản lý hồ sơ điện tử, như:</p>
        <div class="content--text">
            <div class="content__text--items">
                <div class="text--item">
                    <!-- <img src="https://dichvucong.gov.vn/p/home/theme/img/gioithieu/login.svg" alt=""> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M24 40.2254H47.4891" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10"/>
                        <path d="M39.6594 32.3956L47.4891 40.2254L39.6594 48.0551" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M34.9615 23H53.7528V57.4507H34.9615" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Sử dụng tài khoản đã cung cấp bởi các cán bộ ở địa phương từng khu vực để đăng nhập vào Hệ thống quản lý hồ sơ điện tử công dân
                    </p>
                </div>
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M34.9515 35.2441H23" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M34.9515 45.4883H23" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M48.6103 55.7324H23" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M48.6103 25H23" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M48.6104 47.1956C52.3822 47.1956 55.4398 44.138 55.4398 40.3662C55.4398 36.5944 52.3822 33.5368 48.6104 33.5368C44.8386 33.5368 41.7809 36.5944 41.7809 40.3662C41.7809 44.138 44.8386 47.1956 48.6104 47.1956Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M59.7081 51.464L53.4387 45.1946" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Tra cứu thông tin cá nhân, gia đình và các cán bộ công chức của địa phương và toàn cả nước tại xem thông tin; Gửi phản ánh kiến nghị liên quan đến việc giải quyết thủ tục hành chính, dịch vụ công;
                    </p>
                </div>
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M25 20H56.0909V58H25V20Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.0455 28.6364H41.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.0455 39H41.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.0455 49.3636H41.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M31.0455 28.6364L32.7727 30.3636L37.0909 26.0455" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M31.0455 39L32.7727 40.7273L37.0909 36.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M33.6364 51.9545C35.0673 51.9545 36.2273 50.7946 36.2273 49.3636C36.2273 47.9327 35.0673 46.7727 33.6364 46.7727C32.2055 46.7727 31.0455 47.9327 31.0455 49.3636C31.0455 50.7946 32.2055 51.9545 33.6364 51.9545Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Đề nghị hỗ trợ thực hiện thủ tục hành chính, dịch vụ công qua Tổng đài điện thoại 18001096 hoặc trực tuyến tại mục Hỗ trợ;
                    </p>
                </div>
            </div>
            <div class="content__text--items">
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M25 20H56.0909V58H25V20Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.0455 28.6364H41.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.0455 39H41.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.0455 49.3636H41.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M31.0455 28.6364L32.7727 30.3636L37.0909 26.0455" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M31.0455 39L32.7727 40.7273L37.0909 36.4091" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M33.6364 51.9545C35.0673 51.9545 36.2273 50.7946 36.2273 49.3636C36.2273 47.9327 35.0673 46.7727 33.6364 46.7727C32.2055 46.7727 31.0455 47.9327 31.0455 49.3636C31.0455 50.7946 32.2055 51.9545 33.6364 51.9545Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Theo dõi trạng thái các yêu cầu, lịch hẹn xử lý hành chính với cán bộ công chức. Nhận thông báo và phản hồi ý kiến đến cán bộ cơ quan để cải thiện chất lượng.
                    </p>
                </div>
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M33.6025 35.6099L46.3965 28.9754" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10"/>
                        <path d="M33.6025 41.2681L46.3965 47.9026" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10"/>
                        <path d="M28.1463 44.5854C31.5409 44.5854 34.2927 41.8335 34.2927 38.439C34.2927 35.0445 31.5409 32.2927 28.1463 32.2927C24.7518 32.2927 22 35.0445 22 38.439C22 41.8335 24.7518 44.5854 28.1463 44.5854Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M51.8536 32.2927C55.2481 32.2927 58 29.5409 58 26.1463C58 22.7518 55.2481 20 51.8536 20C48.4591 20 45.7073 22.7518 45.7073 26.1463C45.7073 29.5409 48.4591 32.2927 51.8536 32.2927Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M51.8536 56.878C55.2481 56.878 58 54.1262 58 50.7317C58 47.3372 55.2481 44.5854 51.8536 44.5854C48.4591 44.5854 45.7073 47.3372 45.7073 50.7317C45.7073 54.1262 48.4591 56.878 51.8536 56.878Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Đăng nhập bằng tài khoản Hệ thống quản lý hồ sơ điện tử để đăng nhập để có thể xem thông tin cá nhân gia đình, cán bộ và tạo các yêu cầu xử lý hành chính; 
                    </p>
                </div>
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M44.25 36.7778H52" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M44.25 43.6667H52" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M39.0834 47.1111H27.0278C27.0278 44.2574 29.3408 41.9445 32.1945 41.9445H33.9167C36.7704 41.9445 39.0834 44.2574 39.0834 47.1111Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M33.0557 39.3611C34.958 39.3611 36.5001 37.819 36.5001 35.9167C36.5001 34.0143 34.958 32.4722 33.0557 32.4722C31.1533 32.4722 29.6112 34.0143 29.6112 35.9167C29.6112 37.819 31.1533 39.3611 33.0557 39.3611Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M52 23C52 24.9022 50.4577 26.4444 48.5556 26.4444C46.6534 26.4444 45.1111 24.9022 45.1111 23H34.7778C34.7778 24.9022 33.2355 26.4444 31.3333 26.4444C29.4311 26.4444 27.8889 24.9022 27.8889 23H21V54H58.8889V23H52Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Được hỗ trợ truy vấn thông tin của cá nhân, tổ chức lưu trữ tại các Cơ sở dữ liệu, Hệ thống thông tin đã tích hợp với Hệ thống quản lý hồ sơ điện tử như xem thông tin, gửi yêu cầu, đặt lịch hẹn, nhận thông báo,...;

                    </p>
                </div>
            </div>
            <div class="content__text--items">
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M51.0682 25.8864H55.2728V57H25V25.8864H29.2046" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M34.25 41.8636L38.4545 46.0682L46.0227 38.5" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M44.3409 24.2045C44.3409 21.8828 42.4581 20 40.1364 20C37.8146 20 35.9318 21.8828 35.9318 24.2045H32.5682V29.25H47.7045V24.2045H44.3409Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Thực hiện thủ tục hành chính tại nhiều tỉnh, thành phố chỉ cần đăng nhập trên Hệ thống quản lý hồ sơ điện tử;
                    </p>
                </div>
                <div class="text--item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path opacity="0.2" d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="#127E23"/>
                        <path d="M50.707 41.619C50.2814 44.151 48.9723 46.4502 47.0121 48.1085C45.0519 49.7667 42.5675 50.6765 40 50.6765C37.4326 50.6765 34.9481 49.7667 32.988 48.1085C31.0278 46.4502 29.7187 44.151 29.2931 41.619" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M50.8572 35.2857C50.8572 34.3259 50.4759 33.4054 49.7972 32.7267C49.1185 32.0479 48.198 31.6667 47.2382 31.6667C46.2784 31.6667 45.3578 32.0479 44.6791 32.7267C44.0004 33.4054 43.6191 34.3259 43.6191 35.2857" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M36.381 35.2857C36.381 34.3259 35.9997 33.4054 35.321 32.7267C34.6423 32.0479 33.7218 31.6667 32.762 31.6667C31.8022 31.6667 30.8816 32.0479 30.2029 32.7267C29.5242 33.4054 29.1429 34.3259 29.1429 35.2857" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                        <path d="M40 57C50.4934 57 59 48.4934 59 38C59 27.5066 50.4934 19 40 19C29.5066 19 21 27.5066 21 38C21 48.4934 29.5066 57 40 57Z" stroke="#127E23" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="square"/>
                    </svg>
                    <p>
                        Đánh giá sự hài lòng trong giải quyết thủ tục hành chính;
                    </p>
                </div>
            </div>
        </div>
    </div>
    <FooterPage/>
  </div>
</template>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.container-lp {
  /* padding:10px 100px; */
}
.link {
  text-decoration: none;
}
img {
  width: 150px;
  height: auto;
  color: aqua;
}
.header {
  display: flex;
  /* background-color: #d2fad8; */
  justify-content: space-between;
  align-items: center;
  padding:10px 190px;

}
.header h2 {
  margin: 0;
}
.header--logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header-login {
  padding: 7px 20px;
  border-radius: 5px;
  border: 1px solid #127e23;
  background-color: #ffff;
  font-size: 17px;
}
.header-login:hover {
  background-color: #127e23;
  color: #ffff;
  border: 2px solid #127e23;
}
.navbar{
    display: flex;
    width: 86.6%;
    background-color: #127e23;
    color: #ffff;
    padding-left: 190px;
}
.navbar--home svg{
    width: 18px;
    height: auto;
}
.navbar-item{
    padding: 10px 20px;
    color: #ffff;
    fill: #ffff;

}
.navbar-item:hover{
    background-color: #fff;
    color: black;
}
.navbar-item:hover svg{
    fill:  black;
;
}
.context-desc{
    padding-top: 30px;
}
.content--text{
    margin-top: 30px;
}
.content{
    padding: 0px 190px;
    margin-bottom: 100px;
}
.content img{
    width: 100%;
    height: auto;

}
.content__text--items{
    display: flex;
    align-items: center;
    justify-content:flex-start;
    gap: 3%;
}
.text--item{
    width: 31% ;
}
</style>
