<template>
  <div class="container">
    <ListAppointment
    :object="'poliAppointment'"
    :list-appointment="listAppointment"
    :listTmp="listTmp"
    @fetchData="fetchData"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      listAppointment: [],
      listTmp: []
    };
  },
  mounted() {
    this.idPoli = localStorage.getItem("idPolicitian");
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/appointment/politician_id=${this.idPoli}`
          )
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length);
            this.listAppointment = res["data"];
            this.listTmp = this.listAppointment.slice();
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped src="../../../static/asset/styles.css"></style>

