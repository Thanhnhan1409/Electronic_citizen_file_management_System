<template>
  <div class="container-popup">
    <div class="overlay" @click.prevent="closePopUp()"></div>
    <div class="popup-AddAppoint">
      <h3>{{ title }}</h3>
      <div class="content">
        <div class="content--item" v-show="obj !== 'opinion'">
          <p>
            {{
              obj === "poliForwardRequirement"
                ? "ID CBCC chuyển tiếp:"
                : "ID CBCC:"
            }}
          </p>
          <input
            :value="
              obj === 'appointment'
                ? appointment.politician_id
                : obj === 'poliForwardRequirement'
                ? idPoliForward.id
                : obj === 'requirement'
                ? requirement.idPoli
                : ''
            "
            @input="
              obj === 'appointment'
                ? (appointment.politician_id = $event.target.value)
                : obj === 'poliForwardRequirement'
                ? (idPoliForward.id = $event.target.value)
                : obj === 'requirement'
                ? (requirement.idPoli = $event.target.value)
                : ''
            "
            type="text"
            :class="{ input: true, 'is-danger': errors.has('idPoli') }"
            placeholder="Nhập số ID CBCC"
            name="Nhập nội dung"
            id="input-idPoli"
            autocomplete="on"
          />
          <span v-show="errors.has('idPoli')" class="err">{{
            errors.first("idPoli")
          }}</span>
        </div>

        <div class="content--item" v-show="obj === 'appointment'">
          <p>Ngày</p>
          <input
            :value="appointmentDate"
            @input="appointmentDate = $event.target.value"
            type="date"
            v-validate="'required'"
            :class="{ input: true, 'is-danger': errors.has('Ngày') }"
            name="Ngày"
            id="input-date"
            placeholder="Chọn ngày"
            autocomplete="on"
          />
          <span v-show="errors.has('Ngày')" class="err">{{
            errors.first("Ngày")
          }}</span>
        </div>

        <div class="content--item" v-show="obj === 'appointment'">
          <p>Thời gian bắt đầu:</p>
          <input
            :value="obj == 'appointment' ? appointment.startTime : ''"
            @input="
              obj == 'appointment'
                ? (appointment.startTime = $event.target.value)
                : ''
            "
            type="time"
            v-validate="'required'"
            :class="{
              input: true,
              'is-danger': errors.has('Thời gian bắt đầu'),
            }"
            name="Thời gian bắt đầu"
            id=""
            autocomplete="on"
          />
          <span v-show="errors.has('Thời gian bắt đầu')" class="err">{{
            errors.first("Thời gian bắt đầu")
          }}</span>
        </div>

        <div class="content--item" v-show="obj === 'appointment'">
          <p>Thời gian kết thúc:</p>
          <input
            :value="obj == 'appointment' ? appointment.endTime : ''"
            @input="
              obj == 'appointment'
                ? (appointment.endTime = $event.target.value)
                : ''
            "
            type="time"
            v-validate="'required'"
            :class="{
              input: true,
              'is-danger': errors.has('Thời gian kết thúc'),
            }"
            name="Thời gian kết thúc"
            id=""
            autocomplete="on"
          />
          <span v-show="errors.has('Thời gian kết thúc')" class="err">{{
            errors.first("Thời gian kết thúc")
          }}</span>
        </div>

        <div class="content--item" v-show="obj !== 'poliForwardRequirement'">
          <p>Nội dung</p>
          <textarea
            :value="
              obj == 'appointment'
                ? appointment.description
                : obj == 'requirement'
                ? requirement.description
                : obj === 'poliForwardRequirement'
                ? ''
                : opinion.description
            "
            @input="
              obj == 'appointment'
                ? (appointment.description = $event.target.value)
                : obj == 'requirement'
                ? (requirement.description = $event.target.value)
                : obj === 'poliForwardRequirement'
                ? ''
                : (opinion.description = $event.target.value)
            "
            v-validate="'required'"
            :class="{
              input: true,
              'is-danger': errors.has('Nhập nội dung'),
            }"
            name="Nhập nội dung"
            id="input-description"
            autocomplete="on"
          ></textarea>
          <span v-show="errors.has('Nhập nội dung')" class="err">{{
            errors.first("Nhập nội dung")
          }}</span>
        </div>
      </div>
      <div class="icon-close">
        <svg
          @click.prevent="closePopUp()"
          class="popup--icon-close"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </div>
      <div class="popup--button">
        <button class="cancel" @click.prevent="closePopUp()">Hủy</button>
        <button class="confirm" @click.prevent="action()">Thêm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "appointment",
    "requirement",
    "opinion",
    "obj",
    "title",
    "idPoliForward",
    "appointmentDate"
  ],
  methods: {
    closePopUp() {
      this.$emit("closePopup");
    },
    action() {
      this.$emit("action");
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: rgb(239, 238, 238);
  opacity: 0.8;
}
.popup-AddAppoint {
  border: 1px solid black;
  background-color: #fff;
  position: absolute;
  left: 25%;
  top: 15%;
  padding: 40px 60px 20px;
  z-index: 99;
  width: 350px;
  border-radius: 5px;
  border: none;
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
.popup-AddAppoint h3 {
  padding-bottom: 30px;
  text-align: center;
}
.content--item {
  display: flex;
  padding-bottom: 7px;
  justify-content: space-between;
}
.content--item input {
  padding: 4px 8px;
  width: 160px;
  border-radius: 5px;
  border: 1px solid;
}
.content--item textarea {
  min-width: 140px;
  min-height: 50px;
  padding: 4px 8px;
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
  width: 175px;
  border: 0.3px solid black;
  transition: all 0.2s ease;
}

.popup--button {
  display: flex;
  padding: 10px 0;
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
.popup--button button:hover {
  opacity: 0.8;
  box-shadow: 2px 2px 10px 2px rgb(212, 213, 212);
}
</style>
