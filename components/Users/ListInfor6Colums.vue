<template>
  <div class="container-listInfor">
    <h2 class="title">Danh sách {{ title }}</h2>
    <div class="list-appointment">
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">
            {{ object == "family" ? "ID công dân" : "ID CBCC" }}
          </div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">
            {{
              object == "poli"
                ? "Cấp vụ"
                : object == "requirement"
                ? "Ngày"
                : "Quan hệ"
            }}
          </div>
          <div class="col col-4">
            {{
              object == "poli"
                ? "Khu vực"
                : object == "requirement"
                ? "Nội dung"
                : "Ngày sinh"
            }}
          </div>
          <div class="col col-5">
            {{
              object == "poli"
                ? "Chức vụ"
                : object == "requirement"
                ? "Trạng thái"
                : "Số điện thoại"
            }}
          </div>
        </li>
        <ul
          class="responsive-table"
          v-for="(item, index) in listTmp"
          :key="item.id_requirement"
        >
          <li
            class="table-row display"
            @click.prevent="handleClick(item.citizenId)"
          >
            <div class="col col-0 content" data-label="STT">
              {{ index + 1 }}
            </div>
            <div class="col col-1 content" data-label="Số CCCD công dân">
              {{
                object == "poli"
                  ? item.citizen.citizenId
                  : object == "requirement"
                  ? item.author.citizenId
                  : item.citizenId
              }}
            </div>
            <div class="col col-2 content" data-label="Tên">
              {{
                object == "poli"
                  ? item.citizen.name
                  : object == "requirement"
                  ? item.author.name
                  : item.name
              }}
            </div>
            <div class="col col-3 content" data-label="Ngày">
              {{
                object == "poli"
                  ? item.date
                  : object == "requirement"
                  ? item.date
                  : item.homeOwnerRelationship
              }}
            </div>
            <div class="col col-4 content" data-label="Nội dung">
              {{
                object == "poli"
                  ? item.date
                  : object == "requirement"
                  ? item.description
                  : item.birth
              }}
            </div>
            <div class="col col-5 content" data-label="Trạng thái">
              <span class="status-waiting">
                {{
                  object == "poli"
                    ? item.date
                    : object == "requirement"
                    ? item.status
                    : item.phone
                }}
              </span>
            </div>
            <div class="status col col-6" v-show="object === 'requirement'">
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
                <li @click.prevent="updatePopup = true" class="accept-status">
                  Cập nhật
                </li>
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
                <Notification
                  :status="status"
                  :object="'yêu cầu'"
                  :action="'Thêm'"
                  :isShowNoti="showNoti"
                  v-if="showNoti == 'Ok'"
                >
                </Notification>
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
  props: ["object", "listTmp", "title", "updatePopup"],
  data() {
    return {
      isShowPopupDelete: false,
      status: "",
      showNoti: "",
    };
  },
  methods: {
    handleClick(id) {
      if (this.object === "family") {
        this.$emit("pushToDetailInfor", id);
      }
    },
    async deleteRequirement(id_requirement) {
      try {
        this.isShowPopupDelete = false;
        await this.$axios
          .delete(`http://localhost:8080/api/requirement/${id_requirement}`)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
            }, 1500);
          });
      } catch (error) {
        this.isShowPopup = false;
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    closePopup() {
            this.isShowPopupDelete = false;
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
  margin-top: 60px;
  /* margin-left: 10px; */
  padding: 100px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 97%;
}
.status {
  position: absolute;
  right: 55px;
  top: -3px;
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
  top: 30px;
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
</style>
