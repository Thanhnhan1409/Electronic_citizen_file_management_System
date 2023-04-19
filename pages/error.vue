<template>
  <div>
    Bạn không được phép đăng nhập trang này!
    <nuxt-link to="/login">Back to login</nuxt-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      check: false,
      id: '',
      role: []
    };
  },
  // middleware: 'auth',
  mounted() {
    this.id = localStorage.getItem("id");
  },
};
</script>


