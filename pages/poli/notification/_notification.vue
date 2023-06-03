<template>
  <div class="container">
    <Navbar :userName="name" />
    <div @click.prevent="isShow = true" class="add-notification">
      <svg
        class="icon-plus"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"
        />
      </svg>
      <p>Thêm thông báo</p>
    </div>

    <div class="list--content-notification">
      <h2 class="title">Danh dách nội dung thông báo</h2>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">Người nhận</div>
          <div class="col col-3">Nội dung</div>
        </li>
        <ul
          class="responsive-table content"
          v-for="(item, id) in this.listNotification"
          :key="id"
        >
          <li class="table-row display">
            <div class="col col-0" data-label="STT">{{ item.id }}</div>
            <div class="col col-1" data-label="Số CCCD Người nhận">
              <ul
                class="list-idCitizen--items"
                v-for="(tmp, index) in uniqueNames(item.citizens)"
                :key="index"
              >
                <li class="item-idCitizen">{{ tmp }}</li>
              </ul>
            </div>
            <div class="col col-3" data-label="Nội dung">
              {{ item.message }}
            </div>
          </li>
        </ul>
      </ul>
    </div>

    <div class="overlay-Popup" v-show="isShow"></div>

    <div class="add-notificaito--popup" v-show="isShow">
      <svg
        @click.prevent="isShow = false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        />
      </svg>
      <div class="popup-content">
        <h3>Thêm thông báo</h3>
        <ul class="popup-input">
          <div>
            <div class="row">
              <div class="content--item">
                <p>Người nhận:</p>
                <multiselect
                  v-model="selectedCitizenId"
                  :options="listCitizen"
                  placeholder="Chọn công dân"
                  :multiple="true"
                  :close-on-select="false"
                  label="name"
                  @input="updateselectedCitizenId"
                ></multiselect>

                <span v-show="errors.has('idPoli')" class="err">{{
                  errors.first("idPoli")
                }}</span>
              </div>
            </div>
            <div class="popup-input--title">
              <span>Nội dung:</span>
              <textarea
                v-model="description"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button @click.prevent="openPopupConfirm" class="popup-button">
              Thêm thông báo
            </button>
          </div>
        </ul>
      </div>
    </div>

    <PopupConfirm
      :title="'thêm tài khoản'"
      @action="postData"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'thông báo'"
      :action="'Gửi'"
      :isShowNoti="showNoti"
      v-if="showNoti == 'Ok'"
    >
    </Notification>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listIdCitizen: [],
      description: "",
      author_id: null,
      list: [],
      stringIdCitizen: "",
      listNotification: [],
      title: "thêm thông báo",
      selectedCitizenId: [],
      date: "",
      isShowPopup: false,
      isShow: false,
      status: "",
      showNoti: "",
      name: "",
      listCitizen: [],
      fUrl: "http://localhost:8080/api/citizen/listCitizen/",
      url: "",
      nameArea: "",
      level: "",
    };
  },
  mounted() {
    this.author_id = localStorage.getItem("idPolicitian");
    this.fetchListNotification();
    this.name = localStorage.getItem("name");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.checkLevelManager();
    this.fetchData();
  },
  methods: {
    async postData() {
      try {
        this.isShowPopup = false;
        console.log("danh sach ng duoc gui yeu cau" + this.listIdCitizen);
        await this.$axios
          .post(`http://localhost:8080/api/notification/newNotification`, {
            recipient_id: this.listIdCitizen,
            description: this.description,
            author_id: this.author_id,
          })
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
            }, 1500);
            this.list = res.data;
            this.fetchListNotification();
            this.listIdCitizen = [];
          });
      } catch (error) {
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    async fetchListNotification() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/notification/politicianId=${this.author_id}`
          )
          .then((res) => {
            this.listNotification.splice(0, this.listNotification.length);
            this.listNotification = res.data;
            this.stringIdCitizen = "";
            this.description = "";
          });
      } catch (error) {
        console.log(error);
      }
    },
    openPopupConfirm() {
      this.isShow = false;
      this.isShowPopup = true;
    },
    closePopup() {
      this.isShow = true;
      this.isShowPopup = false;
    },
    uniqueNames(citizens) {
      const uniqueNames = [];
      for (let i = 0; i < citizens.length; i++) {
        const name = citizens[i].name;
        if (!uniqueNames.includes(name)) {
          uniqueNames.push(name);
        }
      }
      return uniqueNames;
    },
    async updateselectedCitizenId(value) {
      if (this.selectedCitizenId !== null) {
        console.log(this.selectedCitizenId);
        this.listIdCitizen.push(this.selectedCitizenId[this.selectedCitizenId.length-1].citizen_id);
        console.log(this.listIdCitizen);
      }
      this.selectedCitizenId = value;
    },
    checkLevelManager() {
      if (this.level == "city")
        this.url = `${this.fUrl}city=${encodeURIComponent(this.nameArea)}`;
      else if (this.level == "district")
        this.url = `${this.fUrl}district=${encodeURIComponent(this.nameArea)}`;
      else if (this.level == "town")
        this.url = `${this.fUrl}town=${encodeURIComponent(this.nameArea)}`;
      else
        this.url = `${this.fUrl}quarter=${encodeURIComponent(this.nameArea)}`;
    },
    async fetchData() {
      try {
        await this.$axios.get(`${this.url}`).then((res) => {
          this.listCitizen = res.data;
          console.log(this.listCitizen);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.overlay-Popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  background-color: rgb(139, 142, 144);
  opacity: 0.8;
}
.title {
  font-size: 22px;
  position: absolute !important;
  margin: 0;
  left: 10px;
  top: 20px;
  color: #4b4545;
}
ul li {
  list-style: none;
  padding: 0px;
}
.display-block {
  display: block !important;
}
.list--content-notification {
  margin-top: 60px;
  padding: 100px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 97%;
}
.responsive-table .col-0 {
  flex-basis: 10%;
}
.responsive-table .col-1 {
  flex-basis: 15%;
}
.responsive-table .col-2 {
  flex-basis: 15%;
}

.responsive-table .col-3 {
  flex-basis: 45%;
}
.item-idCitizen {
  padding: 2px 3px !important;
  margin: 0 !important;
}
.list-idCitizen--items {
  padding: 0;
}
.icon-plus {
  width: 16px;
  height: auto;
  /* fill: #fff; */
  margin-left: 7px;
}

.add-notification {
  box-shadow: 3px 3px 10px 2px rgb(231, 226, 226);
  position: absolute;
  display: flex;
  padding: 7px 15px;
  border-radius: 10px;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  right: 60px;
  top: 40px;
  margin-right: 20px;
  background-color: #ffffff;
  transition: all 0.3s linear;
  cursor: pointer;
  z-index: 3;
}

.add-notification:hover {
  transform: scale(1.05);
}

.add-notification p {
  margin: 0px;
  margin-left: 5px;
}

.add-notificaito--popup {
  width: 400px;
  height: auto;
  box-shadow: 3px 3px 10px 2px rgb(207, 203, 203);
  padding: 10px 20px;
  border-radius: 10px;
  position: fixed;
  top: 30%;
  left: 40%;
  background-color: #ffffff;
  z-index: 20;
  /* display: none; */
  transition: all 0.2 ease;
}

.add-notificaito--popup svg {
  width: 12px;
  height: auto;
  position: absolute;
  right: 20px;
  fill: rgb(107, 106, 106);
  cursor: pointer;
}

.popup-input {
  padding: 10px 30px;
}

.popup-content {
  transition: all 0.2s ease;
}

.popup-content h3 {
  text-align: center;
  padding-top: 10px;
}

.popup-input--title {
  display: flex;
  margin-top: 10px;
}

.popup-input--title span {
  width: 30%;
}

.popup-input--title input {
  border: none;
  width: 215px;
  border-bottom: 1px solid rgb(59, 59, 59);
  margin-left: 10px;
  padding: 5px 7px;
  /* border-radius: 5px; */
}

.popup-input--title textarea {
  width: 210px;
  height: 50px;
  margin-left: 10px;
  padding: 5px 10px;
  /* border-radius: 10px; */
}

.popup-button {
  padding: 5px 10px;
  border: none;
  margin-top: 20px;
  background-color: green;
  border-radius: 5px;
  color: #ffffff;
  position: relative;
  left: 32%;
  cursor: pointer;
  transition: all 0.2s ease;
}
.popup-button:hover {
  box-shadow: 3px 3px 10px 3px rgb(217, 217, 217);
  transform: scale(1.03);
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 10px;
}
</style>
