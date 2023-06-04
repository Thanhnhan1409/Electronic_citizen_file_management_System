<template>
  <div class="container">
    <div class="overlay-hidden"></div>
    <div class="tableft">
      <img class="img--logo" src="../../static/images/logo.png" alt="" />

      <h3>HỆ THỐNG QUẢN LÝ HỒ SƠ ĐIỆN TỬ CÔNG DÂN</h3>

      <ul class="tableft__list--options">
        <!-- home page -->
        <li
          class="tableft--option"
          @click.prevent="pushToHomePage()"
          :class="{
            'page-choose':
              pageParam == '/citizen' ||
              pageParam == '/poli' ||
              pageParam == '/admin/statistical',
          }"
        >
          <svg
            :class="{
              'fill-svg':
                pageParam == '/citizen' ||
                pageParam == '/poli' ||
                pageParam == '/admin/statistical',
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              class="tableft-icon"
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            />
          </svg>
          {{ role === "admin" ? "Thống kê" : "Trang Chủ" }}
        </li>

        <!-- view information -->
        <li
          class="manage--option"
          :class="{
            'background-white':
              pathViewInformation() || showPageData === 'seeInfor',
          }"
          @click.prevent="showPage = 'seeInfor'"
        >
          <div
            class="tableft--option"
            :class="{
              'page-choose': pathViewInformation(),
            }"
          >
            <svg
              :class="{
                'fill-svg':
                  pathViewInformation() || showPageData === 'seeInfor',
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
              />
            </svg>
            Xem thông tin
          </div>

          <ul
            class="tableft__manage--options"
            v-show="pathViewInformation() || showPageData === 'seeInfor'"
          >
            <li
              v-show="role === 'politician'"
              @click.prevent="$router.push('/poli/viewInforCitizen')"
              class="tableft__options--item"
            >
              Thông tin công dân
            </li>

            <li
              v-show="role !== 'admin'"
              @click.prevent="$router.push('/citizen/family')"
              class="tableft__options--item"
            >
              Thông tin nhân thân
            </li>

            <li
              v-show="role !== 'admin'"
              @click.prevent="$router.push('/citizen/listInforPoli')"
              class="tableft__options--item"
            >
              Thông tin cán bộ
            </li>
            <li
              v-show="role === 'admin'"
              @click.prevent="$router.push('/admin/listInforAll')"
              class="tableft__options--item"
            >
              Thông tin người dùng
            </li>
          </ul>
        </li>

        <!-- Management information -->
        <li
          class="manage--option"
          v-show="role !== 'citizen'"
          v-bind:class="{
            'background-white':
              pathManageInformation() || showPage == 'inforManager',
          }"
          @click.prevent="showPage = 'inforManager'"
        >
          <div
            class="tableft--option"
            :class="{
              'page-choose': pathManageInformation(),
            }"
          >
            <svg
              :class="{
                'fill-svg':
                  pathManageInformation() || showPage == 'inforManager',
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"
              />
            </svg>
            Quản lý thông tin
          </div>

          <ul
            class="tableft__manage--options"
            v-show="pathManageInformation() || showPage == 'inforManager'"
          >
            <li
              class="tableft__options--item"
              @click.prevent="pushToAddAccount"
            >
              Thêm tài khoản
            </li>
            <li
              class="tableft__options--item"
              @click.prevent="pushToUpdateAccount"
            >
              Cập nhật tài khoản
            </li>
          </ul>
        </li>

        <!-- Requirements -->
        <li
          class="manage--option"
          v-show="role !== 'admin'"
          v-bind:class="{
            'background-white': pathRequirement(),
          }"
          @click.prevent="showPage = 'requirements'"
        >
          <div
            class="tableft--option"
            :class="{
              'page-choose':
                pageParam == '/poli/requirement' ||
                pageParam == '/citizen/requirements',
            }"
          >
            <svg
              :class="{
                'fill-svg': pathRequirement(),
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
              />
            </svg>
            Yêu cầu
          </div>

          <ul class="tableft__manage--options" v-show="pathRequirement()">
            <li
              @click.prevent="$router.push('/poli/requirement')"
              v-show="role === 'politician'"
              class="tableft__options--item"
            >
              Danh sách yêu cầu
            </li>

            <li
              @click="$router.push('/citizen/requirements')"
              v-show="role !== 'admin'"
              class="tableft__options--item"
            >
              Gửi yêu cầu
            </li>
          </ul>
        </li>

        <!-- Notification -->
        <li
          class="manage--option"
          v-show="role !== 'admin'"
          v-bind:class="{
            'background-white':
              pathNotification() || showPageData == 'notifications',
          }"
          @click.prevent="showPage = 'notifications'"
        >
          <div
            class="tableft--option"
            :class="{
              'page-choose': pathNotification(),
            }"
          >
            <svg
              :class="{
                'fill-svg':
                  pathNotification() || showPageData == 'notifications',
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
              />
            </svg>
            Thông báo
          </div>

          <ul
            class="tableft__manage--options"
            v-show="pathNotification() || showPageData == 'notifications'"
          >
            <li
              v-show="role === 'politician'"
              @click="$router.push('/poli/notification')"
              class="tableft__options--item"
            >
              Gửi thông báo
            </li>
            <li
              v-show="role !== 'admin'"
              @click="$router.push('/citizen/notifications')"
              class="tableft__options--item"
            >
              Danh sách thông báo
            </li>
          </ul>
        </li>

        <!-- appointments -->
        <li
          class="manage--option"
          v-show="role !== 'admin'"
          v-bind:class="{
            'background-white':
              pathAppointment() || showPageData === 'appointments',
          }"
          @click.prevent="showPage = 'appointments'"
        >
          <div
            class="tableft--option"
            :class="{
              'page-choose': pathAppointment(),
            }"
          >
            <svg
              :class="{
                'fill-svg':
                  pathAppointment() || showPageData === 'appointments',
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
              />
            </svg>
            Lịch hẹn
          </div>

          <ul
            class="tableft__manage--options"
            v-show="pathAppointment() || showPageData === 'appointments'"
          >
            <li
              v-show="role === 'politician'"
              @click="$router.push('/poli/appointment')"
              class="tableft__options--item"
            >
              Xem lịch hẹn
            </li>

            <li
              @click="$router.push('/citizen/appointments')"
              class="tableft__options--item"
            >
              Hẹn lịch
            </li>
          </ul>
        </li>

        <!-- opinions -->
        <li
          class="tableft--option"
          v-show="role !== 'admin'"
          @click.prevent="
            $router.push('/citizen/opinions');
            showPage = '';
          "
          :class="{
            'page-choose': pageParam == '/citizen/opinions',
          }"
        >
          <svg
            :class="{
              'fill-svg': pageParam == '/citizen/opinions',
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"
            />
          </svg>
          Đóng góp ý kiến
        </li>

        <!-- statistical -->
        <li
          class="tableft--option"
          @click.prevent="pushToStatistical"
          v-show="role === 'politician'"
          :class="{
            'page-choose': pageParam == '/poli/statistical',
          }"
        >
          <svg
            :class="{
              'fill-svg': pageParam == '/poli/statistical',
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
            />
          </svg>
          Thống kê và báo cáo
        </li>
      </ul>

      <div @click.prevent="isShowPopup = true" class="tableft-logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
        Đăng xuất
      </div>
    </div>
    <PopupConfirm
      :title="'đăng xuất'"
      @action="logout"
      v-show="isShowPopup"
      @closePopup="isShowPopup = false"
    >
    </PopupConfirm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "",
      isShowPopup: false,
      showPage: "",
      pushTo: "",
    };
  },
  computed: {
    pageParam() {
      return this.$route.path;
    },
    showPageData() {
      return this.showPage;
    },
  },
  mounted() {
    this.role = localStorage.getItem("role");
  },
  watch: {
    pushTo() {
      this.pushToPage();
    },
    showPage() {},
  },
  methods: {
    async logout() {
      try {
        console.log("test logout1");
        await this.$axios
          .get(`http://localhost:8080/api/v1/auth/logout`)
          .then((res) => {
            console.log("test logout2");
            this.$router.push("/");
          });
      } catch (error) {
        console.log("test logout3");
        console.log(error);
      }
    },
    pushToHomePage() {
      this.showPage = "";
      if (this.role === "politician") {
        return this.$router.push("/poli");
      } else if (this.role === "admin") {
        return this.$router.push("/admin/statistical");
      }
      return this.$router.push("/citizen");
    },
    pushToStatistical() {
      this.showPage = "";
      this.$router.push("/poli/statistical");
    },
    pushToUpdateAccount() {
      if (this.role === "admin") {
        return this.$router.push("/admin/update");
      } else {
        return this.$router.push("/poli/update");
      }
    },
    pushToAddAccount() {
      if (this.role === "admin") {
        return this.$router.push("/admin/addAccount");
      } else {
        return this.$router.push("/poli/addAccount");
      }
    },
    pushToPage() {
      this.showPage = "";
      switch (this.pushTo) {
        case "seeAppointments": {
          // this.showPage = "";
          return this.$router.push("/poli/appointment");
        }
        case "setAppointments": {
          return this.$router.push("/citizen/appointments");
        }
        default:
          break;
      }
    },
    pathViewInformation() {
      if (
        this.pageParam === "/poli/viewInforCitizen" ||
        this.pageParam === "/citizen/family" ||
        this.pageParam === "/citizen/listInforPoli" ||
        this.pageParam === "/admin/listInforAll" ||
        this.pageParam === "/poli/viewInforCitizen/inforCitizen" ||
        this.pageParam === "/citizen/family/inforMember" ||
        this.pageParam === "/citizen/listInforPoli/inforPoli"
      )
        return true;
      return false;
    },
    pathRequirement() {
      if (
        this.pageParam == "/poli/requirement" ||
        this.pageParam == "/citizen/requirements" ||
        this.showPage == "requirements"
      )
        return true;
      return false;
    },
    pathAppointment() {
      if (
        this.pageParam == "/poli/appointment" ||
        this.pageParam == "/citizen/appointments"
      )
        return true;
      return false;
    },
    pathNotification() {
      if (
        this.pageParam == "/poli/notification" ||
        this.pageParam == "/citizen/notifications"
      )
        return true;
      return false;
    },
    pathManageInformation() {
      if (
        this.pageParam == "/admin/update" ||
        this.pageParam == "/admin/addAccount" ||
        this.pageParam == "/poli/update" ||
        this.pageParam == "/poli/addAccount"
      )
        return true;
      return false;
    },
    // test() {
    //   this.showPage = "";
    //   this.$router.push("/citizen/requirements");
    // },
    // test2(){
    //   this.showPage = "";
    //     const elements = document.getElementsByClassName(
    //     "tableft__manage--options"
    //   );
    //   for (let i = 0; i < elements.length; i++) {
    //     elements[i].classList.add("disable");
    //   }
    //   this.$router.push("/citizen/listInforPoli");
    // },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.img--logo {
  width: 120px;
  height: 120px;
  position: relative;
  left: 70px;
  top: 10px;
}
.overlay-hidden {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgb(239, 238, 238);
}
.tableft {
  position: fixed;
  width: 252px;
  height: 100%;
  left: 0px;
  top: -2px;
  bottom: -10px;
  background-color: #127e23;
  color: #fff;
  z-index: 9;
}

.tableft h3 {
  font-size: 16px;
  text-align: center;
  padding: 5px 10px;
  margin-bottom: 10px;
}

.tableft__manage--options {
  position: relative;
  left: -10px;
  padding-bottom: 1px;
  transition: all 0.5s linear;
}
.tableft__options--item {
  padding: 10px 0px 10px 100px;
  width: 162px;
  cursor: pointer;
}
.manage--option {
  margin-top: 2px;
}
.manage--option li:hover {
  background-color: #127e23;
  color: #fff;
}

svg {
  width: 14px;
  height: auto;
  fill: #ffff;
  margin-right: 10px;
}

.tableft--option {
  padding: 5px 10px 5px 50px;
  line-height: 30px;
  cursor: pointer;
  font-weight: 550;
}

.background-white {
  background-color: #fff;
  color: #127e23;
}

.tableft__list--options {
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  /* border-bottom: 1px solid #fff; */
}

.tableft-logout {
  padding: 15px 10px 15px 90px;
  display: flex;
  transition: all 0.3s linear;
  position: absolute;
  left: -40px;
  bottom: 0;
  width: 192px;
  text-decoration: none;
  border-top: 1px solid #fff;
  color: #fff;
}

.tableft-logout svg {
  width: 20px;
  height: auto;
}
.fill-svg {
  fill: #127e23;
  width: 14px;
}

.tableft-logout:hover {
  background-color: #fff;
  color: #127e23;
  transform: translateX(30px);
  font-weight: 600;
  width: 162px;
}

.tableft-logout:hover svg {
  fill: #127e23;
  transform: scale(1.2);
}
.page-choose {
  background-color: #fff !important;
  color: #127e23 !important;
  border-left: 5px solid #bd7e10 !important;
  font-weight: 600 !important;
}
</style>
