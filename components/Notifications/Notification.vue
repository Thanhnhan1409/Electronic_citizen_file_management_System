<template>
  <div
    class="noti-container"
    :style="{
      'border-color':
        status === 'thành công'
          ? '#7CB969'
          : status === 'thất bại'
          ? '#C7422E'
          : '#FDC571',
    }"
  >
    <div class="icon-close">
      <svg
        @click.prevent="isShowNoti=''"
        class="popup--icon-close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        />
      </svg>
    </div>
    <div class="content">
      <svg
        v-show="status == 'thất bại'"
        class="icon-failed"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
        />
      </svg>
      <svg
        v-show="status == 'thành công'"
        class="icon-susscess"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
        />
      </svg>
      <p class="desc">{{ content }}</p>
    </div>
    <div
      class="line-bottom"
      :style="{
        'background-color':
          status === 'thành công'
            ? '#7CB969'
            : status === 'thất bại'
            ? '#C7422E'
            : '#FDC571',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["status", "action", "object","isShowNoti"],
  data() {
    return {
      content: this.action + " " + this.object + " " + this.status + "!",
    };
  },
};
</script>

<style scoped>
.noti-container {
  overflow: hidden;
  z-index: 999;
  position: fixed;
  top: 10px;
  right: 10px;
  width: 350px;
  height: 50px;
  border-radius: 7px;
  border: 1px solid;
  background-color: #ffff;
  padding: 10px;
  /* background-color: red; */
}

.icon-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  transition: all 0.5s ease;
}

.popup--icon-close {
  width: 10px;
  height: auto;
  cursor: pointer;
  fill: #818281;
  padding: 2px 0 0 5px;
}

.icon-close:hover {
  background-color: #d8d9d8;
}

.content svg {
  width: 28px;
  height: auto;
  position: absolute;
  top: 18px;
  left: 15px;
}
.icon-susscess {
  fill: #7cb969;
}
.icon-failed {
  fill: #c7422e;
}
.desc {
  padding-left: 50px;
  padding-top: 13px;
  letter-spacing: 1.2;
}

.line-bottom {
  width: 100%;
  height: 5px;
  animation: line-through 1s linear forwards;
  position: absolute;
  left: 0;
  bottom: 0;
}

@keyframes line-through {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>
