<template>
  <div class="container-update">
    <BackToList />
    <div id="overlay" class="display-hide"></div>
    <div class="content">
      <h2 class="title">Cập nhật thông tin cá nhân công dân</h2>
      <nuxt-link to="/admin/updateInfor/updateInforPoli">
        <div class="update--role">
          Cập nhật quyền quản lý
          <svg
            class="update__role--svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L370.7 256 233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L178.7 256 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
            />
          </svg>
        </div>
      </nuxt-link>
      <Search class="search" v-model="idSearch" @search="handleSearch" />
      <AddAccount
        :listInfor="list"
        :action="'Cập nhật'"
        @openPopup="openPopup()"
      />
      <PopupConfirm
        :title="'cập nhật tài khoản'"
        @action="submit()"
        v-show="isShowPopup"
        @closePopup="closePopup()"
      >
      </PopupConfirm>
      <Notification
        :status="status"
        :object="'tài khoản'"
        :action="'Cập nhật'"
        :isShowNoti="showNoti"
        v-if="showNoti == 'Ok'"
      >
      </Notification>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        nationality: "Việt Nam",
      },
      idSearch: "",
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  // middleware: 'nhan',
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.idSearch}`
          )
          .then((res) => {
            this.list = res.data;
            this.list.quarter = res.data.location.quarter;
            this.list.town = res.data.location.town;
            this.list.district = res.data.location.district;
            this.list.city = res.data.location.city;
            this.list.idFamily = res.data.family;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        console.log("idFamily"+ this.list.idFamily);
        this.isShowPopup = false;
        console.log("list in"+this.list);
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`, this.list)
          .then((res) => {
            this.list = res.data;
            console.log("after test"+this.list);

            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/admin/listInforAll/_listInforAll");
            }, 1500);
          });
          console.log("test"+this.list);

      } catch (error) {
        console.log("test err"+this.list);
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    handleSearch(id) {
      this.idSearch = id;
      this.fetchData();
    },
    closePopup() {
      this.isShowPopup = false;
    },
    openPopup() {
      this.isShowPopup = true;
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.container-update {
  position: relative;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin: 90px 0 40px 310px;
}

ul {
  list-style: none;
}
img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
  border-radius: 8px;
  border: 0.8px solid black;
}
.submit {
  padding: 10px 20px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 70px;
  cursor: pointer;
  box-shadow: 3px 3px 3px 1px rgba(218, 169, 36, 0.25);
  top: 280px;
  z-index: 2;
  transition: all 0.2s ease;
}
.submit:hover {
  transform: scale(1.05);
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0.6;
  background-color: rgb(139, 142, 144);
  animation: overlay 0.5s ease forwards;
  z-index: 10;
}
.display-block {
  display: block !important;
}

.display-hide {
  display: none !important;
}
.search {
  position: absolute;
  top: 180px;
  left: 320px;
  width: fit-content;
}

@keyframes icon-nextPage {
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(10px);
  }
}
.update--role {
  background-color: #ffffff;
  box-shadow: 3px 3px 10px rgb(202, 200, 200);
  position: absolute;
  color: black;
  font-weight: 600;
  top: 180px;
  right: 40px;
  z-index: 2;
  padding: 7px 15px;
  border-radius: 5px;
  display: flex;
  transition: all 0.3s linear;
}
.update__role--svg {
  width: 15px;
  height: auto;
  fill: green;
  margin-left: 10px;
  transition: all 0.3s linear;
}
.update--role:hover {
  transform: scale(1.05);
}
.update--role:hover .update__role--svg {
  transform: translateX(10px);
}
</style>
