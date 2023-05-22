<template>
  <div class="container-listInfor">
    <div class="list-appointment">
      <h2
        :class="
          object === 'poli'
            ? 'title-poli'
            : 'title'
        "
      >
        Danh sách {{ title }}
      </h2>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">
            {{
              object === "family" ||
              object === "poliRequirement" ||
              object === "poliListCitizen"
                ? "Số CCCD"
                : "ID CBCC"
            }}
          </div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">
            {{
              object == "poli"
                ? "Cấp vụ"
                : object == "family"
                ? "Quan hệ"
                : object == "poliListCitizen"
                ? "Giới tính"
                : "Ngày"
            }}
          </div>
          <div class="col col-4">
            {{
              object === "poli"
                ? "Khu vực"
                : object === "family"
                ? "Ngày sinh"
                : object === "poliListCitizen"
                ? "Địa chỉ"
                : "Nội dung"
            }}
          </div>
          <div class="col col-5">
            {{
              object === "poli"
                ? "Chức vụ"
                : object === "requirement" || object === "poliRequirement"
                ? "Trạng thái"
                : "Số điện thoại"
            }}
          </div>
        </li>
        <ul
          class="responsive-table"
          v-for="(item, index) in listTmp"
          :key="index"
        >
          <li
            class="table-row display"
            @click.prevent="handleClick(item)"
          >
            <div class="col col-0 content" data-label="STT">
              {{ index + 1 }}
            </div>
            <div class="col col-1 content" data-label="Số CCCD công dân">
              {{
                object === "poli"
                  ? item.citizen.citizenId
                  : object === "family"
                  ? item.citizenId
                  : object === "poliListCitizen"
                  ? item.citizen_id
                  : item.author.citizenId
              }}
            </div>
            <div class="col col-2 content" data-label="Tên">
              {{
                object === "poli"
                  ? item.citizen.name
                  : object === "requirement" || object === "poliRequirement"
                  ? item.author.name
                  : item.name
              }}
            </div>
            <div class="col col-3 content" data-label="Ngày">
              {{
                object === "poli"
                  ? item.levelManagerVN
                  : object === "family"
                  ?  item.homeOwnerRelationship
                  : object === 'poliListCitizen'
                  ? item.gender? "Nam": "Nữ" 
                  : item.date
              }}
            </div>
            <div class="col col-4 content" data-label="Nội dung">
              {{
                object == "poli"
                  ? item.areaManage
                  : object == "family"
                  ? item.birth
                  : object === "poliListCitizen"
                  ? item.address
                  : item.description
              }}
            </div>
            <div class="col col-5 content" data-label="Trạng thái">
              <span class="status-waiting">
                {{
                  object === "poli"
                    ? item.position
                    : object === "requirement" || object === "poliRequirement"
                    ? item.status
                    : item.phone
                }}
              </span>
            </div>
            <div class="status col col-6" v-if="object === 'requirement'">
              <svg
                class="icon__status-dot"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 512"
              >
                <path
                  d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z"
                />
              </svg>
              <ul class="update-app">
                <li
                  @click.prevent="isShowPopupDelete = true"
                  class="deny-status"
                >
                  Xóa
                </li>
                <PopupConfirm
                  :title="'xóa yêu cầu'"
                  @action="deleteRequirement(item.id_requirement)"
                  v-show="isShowPopupDelete"
                  @closePopup="closePopup"
                >
                </PopupConfirm>
              </ul>
            </div>
            <div class="status col col-7" v-if="object === 'poliRequirement'">
              <svg
                class="icon__status-dot"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 512"
              >
                <path
                  d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z"
                />
              </svg>
              <ul class="status-action">
                <li @click.prevent="handleAccept" class="accept-status">Chấp nhận</li>
                <li @click.prevent="handleDenied" class="deny-status">Từ chối</li>
                <li @click.prevent="openPopUp(item)" >Chuyển tiếp</li>
                
                <PopupConfirm
                  :title="updatedStatus ==='denied'?  'đổi trạng thái sang từ chối': 'đổi trạng thái sang chấp nhận'"
                  @action="updatedStatus ==='denied'? denied(item):Accept(item) "
                  v-show="isShowPopup === true"
                  @closePopup="closePopup"
                >
                </PopupConfirm>
              </ul>
            </div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["object", "listTmp", "title", "updatePopup","updateStatus"],
  data() {
    return {
      isShowPopupDelete: false,
      status: "",
      showNoti: "",
      updatedStatus:'',
      isShowPopup:''

    };
  },
  methods: {
    handleClick(item) {
      
      if (this.object === "family" || this.object === "poliListCitizen") {
        localStorage.setItem("idViewInfor", item.citizenId)
        this.$emit("pushToDetailInfor", item.citizenId);
      } else if ( this.object === "poli") {
        localStorage.setItem("idViewInfor",item.citizen.citizenId)
        this.$emit("pushToDetailInfor", item.citizen.citizenId);
      }
    },
    async deleteRequirement(id_requirement) {
      this.isShowPopupDelete = false;
      this.$emit("deleteRequirement", id_requirement);
    },
    closePopup() {
      this.isShowPopupDelete = false;
      this.isShowPopup = false;
    },
    handleAccept(){
      this.isShowPopup = true ;
      this.updatedStatus = 'accept';

    },
    handleDenied(){
      this.isShowPopup = true ;
      this.updatedStatus = 'denied';
    },
    openPopUp(item) {
      console.log("hehehe m co hien len noi kh");

      this.$emit("openPopup",item)
    },
    Accept(item) {
      // this.updateStatus = "Chấp nhận";
      this.$emit("accept",item)
      this.isShowPopup=false;
      // this.renderAllReq();
    },
    denied(item) {
      // this.updateStatus = "Từ chối";
      this.$emit("denied",item)
      this.isShowPopup=false;


    },
  },
};
</script>

<style scoped src="../../static/asset/styles.css"></style>
<style scoped>
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
  flex-basis: 15%;
}
.responsive-table .col-4 {
  flex-basis: 25%;
}
.responsive-table .col-5 {
  flex-basis: 15%;
}
.table-row:hover .content {
  color: #127e23;
  font-weight: 600;
  text-decoration: underline;
}
.list-appointment {
  margin-top: 80px;
  /* margin-left: 10px; */
  padding: 10px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 100%;
}
.title-poli {
  font-size: 22px;
  margin: 50px 0 60px 0;
  z-index: 2;
  color: #4b4545;
  padding-left: 20px;
  /* left: 20px;
    top: 20px; */
  padding-bottom: 80px;
  width: fix-content;
}
.status {
  position: absolute;
  right: 55px;
  top: 20px;
}
.update-app {
  padding: 10px 15px;
  box-shadow: 3px 3px 10px #cccccc;
  background-color: #fff;
  border-radius: 5px;
  width: 100px;
  font-size: 15px;
  z-index: 3;
  transition: all 0.2s linear;
  opacity: 0;
  visibility: hidden;
}
.update-app:hover {
  opacity: 1;
  visibility: visible;
  display: block;
}
.update-app li {
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.update-app li:hover {
  color: rgb(196, 152, 20);
  font-weight: 550;
}
.update-app .accept-status:hover {
  color: #127e23;
  font-weight: 550;
}
.update-app .deny-status:hover {
  color: rgb(196, 29, 20);
  font-weight: 550;
}
.icon__status-dot {
  position: absolute;
  right: 0px;
  top: 10px;
  width: 3px;
  height: auto;
  cursor: pointer;
  z-index: 3;
  /* z-index: 4; */
}
.icon__status-dot:hover {
  fill: green;
}
.icon__status-dot:hover + .update-app {
  opacity: 1;
  visibility: visible;
  display: block;
}
.status-action {
  padding: 10px 15px;
  box-shadow: 3px 3px 10px #cccccc;
  background-color: #fff;
  border-radius: 5px;
  width: 100px;
  font-size: 15px;
  z-index: 3;
  transition: all 0.2s linear;
  opacity: 0;
  visibility: hidden;
}
.status-action li {
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.status-action li:hover {
  color: rgb(196, 152, 20);
  font-weight: 550;
}
.status-action .accept-status:hover {
  color: #127E23;
  font-weight: 550;
}
.status-action .deny-status:hover {
  color: rgb(196, 29, 20);
  font-weight: 550;
}
.icon__status-dot:hover + .status-action {
  opacity: 1;
  visibility: visible;
  display: block;
}
.status-action:hover {
  opacity: 1;
  visibility: visible;
  display: block;
}
</style>
