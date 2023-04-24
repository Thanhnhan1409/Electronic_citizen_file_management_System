<template>
  <div class="container">
    <div id="overlay" class=" display-hide"></div>
    <div id="popup--confirm-change" class=" display-hide ">
      <svg @click.prevent="closePopUp" class="popup--icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
      </svg>
      <ul class="infor__content--items">
                  <li class="content--item div-center">
                      <div class="left">
                          Họ tên:
                          <span>{{ listInfor.name }}</span>
                      </div>
                      <div>
                          Ngày sinh:
                          <span>{{ listInfor.birth }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                      <div class="left">
                          Giới tính:
                          <span>{{ listInfor.gender ? 'Nam' : "Nữ" }}</span>
                      </div>
                      <div>
                          Dân tộc:
                          <span>{{ listInfor.ethnic }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                      <div class="left">
                          Số CCCD:
                          <span>{{ listInfor.citizen_id }}</span>
                      </div>
                      <div>
                          Số hộ khẩu:
                          <span>{{ listInfor.family?.id_Family }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                      <div class="left">
                          Quốc tịch:
                          <span>{{ listInfor.nationality }}</span>
                      </div>
                      <div>
                          Tôn giáo:
                          <span>{{ listInfor.religion }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                      <div>
                          Địa chỉ:
                          <span>{{ listInfor.address }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                      <div>
                          Nghề nghiệp:
                          <span>{{ listInfor.profession }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                      <div class="left">
                          Điện thoại:
                          <span>{{ listInfor.address }}</span>
                      </div>
                      <div>
                          Email:
                          <span>{{ listInfor.email }}</span>
                      </div>
                  </li>
                  <li class="content--item div-center">
                    
                      <div>
                         Tình trạng hôn nhân:
                          <span>{{ listInfor.married ? "Đã kết hôn" : "Chưa kết hôn" }}</span>
                      </div>
                  </li>
              </ul>
      
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'title'
  ],
  methods: {
    closePopUp() {
      document.querySelector('#overlay').classList.add('display-hide');
      document.querySelector('#popup--confirm-change').classList.add('display-hide');
      document.querySelector('#popup--confirm-change').classList.remove('display-block');
      document.querySelector('#popup--confirm-change').classList.remove('display-block');

    },
    action() {
      this.$emit('action')
      this.closePopUp();
    }
  }
}
</script>
<style scoped>
.display-block {
  animation: zoom 0.2s ease forwards !important;
}

@keyframes zoom {
  from {
    opacity: 0;
    visibility: hidden;
    display: hidden;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    visibility: visible;
    display: block;
    transform: scale(1.0);
  }
}

.display-flex {
  display: flex !important;
  justify-content: space-evenly;
}

.display-hide {
  display: none !important;
}

#popup--confirm-change {
  width: 280px;
  height: auto;
  background-color: #fff;
  padding: 20px 25px;
  border-radius: 10px;
  position: fixed;
  z-index: 90;
  top: 40%;
  left: 45%;
  box-shadow: 3px 3px 10px 3px rgb(129, 129, 129);
  /* display: block !important; */

}

#popup--confirm-change p {
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
}

.popup--icon-close {
  width: 10px;
  height: auto;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  fill: #818281;
}

.popup--icon-close:hover {
  animation: turn 0.5s ease infinite;
}

@keyframes turn {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

.popup--button button {
  margin-top: 15px;
  padding: 5px 10px;
  cursor: pointer;
  width: 135px;
  border: 0.3px solid black;
}

.popup--button {
  display: flex;
  padding: 10px;
  justify-content: space-between;

}

.cancel {
  background-color: #fff;
  border: 0.3px solid black;
  color: green;

}

.confirm {
  background-color: green;
  color: #fff;
  border: 1.3px solid #fff;
  margin-left: 5px;
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
}</style>