<template>
  <div class="container">
    <div id="overlay" @click.prevent="closePopUp()"></div>
    <div id="popup--confirm-change" >
      <div class="icon-close">
        <svg @click.prevent="closePopUp()" class="popup--icon-close" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </div>
      <p>Bạn có muốn {{ title }} không?</p>
      <div class="popup--button">
        <button class="cancel" @click.prevent="closePopUp()">Hủy</button>
        <button class="confirm" @click.prevent="action()">Xác nhận</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    closePopUp() {
      this.$emit('closePopup')},
    action() {
      console.log(this.type);
      this.$emit('action')
      // this.closePopUp();
    }
  }
}
</script>
<style scoped>


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
  animation: popup-visible 0.3s ease forwards;
}
@keyframes popup-visible {
  from {
        transform: scale(0.2);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
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
  cursor: pointer;
  fill: #818281;
  padding: 2px 0 0 5px;
}

.popup--button button {
  margin-top: 15px;
  padding: 5px 10px;
  cursor: pointer;
  width: 135px;
  border: 0.3px solid black;
  transition: all 0.2s ease;
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

.icon-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  border-radius: 50%;
  transition: all 0.5s ease;
}

.icon-close:hover {
  background-color: #d8d9d8;

}

.popup--button button:hover {
  opacity: 0.8;
  box-shadow: 2px 2px 10px 2px rgb(212, 213, 212);
}
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  background-color: rgb(139, 142, 144);
  z-index: 10;
}
</style>