<template>
  <div class="container-all">
    <Tableft />
    <nuxt-child />
    <!-- <Navbar :userName="name" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // name: "",
    };
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.name = localStorage.getItem("name");
  //   }, 50000);
  // },
};
</script>
