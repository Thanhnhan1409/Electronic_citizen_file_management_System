<template>
  <div class="container">
    <Tableft />
    <Navbar />
    <div class="family">
      <h2>Thông báo</h2>

      <!-- <div class="table">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-0">STT</div>
            <div class="col col-1">Người gửi</div>
            <div class="col col-2">Ngày gửi</div>
            <div class="col col-3">Nội dung</div>
            
            
          </li>
          <li class="table-row display" v-for="(item, index) in items" :key="item.citizen_id"
            @click.prevent="handleClick(item)">
            <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
            <div class="col col-1" data-label="Người gửi ">{{ item.citizen_id }}</div>
            <div class="col col-2" data-label="Họ Tên">{{ item.name }}</div>
            <div class="col col-3" data-label="Ngày sinh">{{ item.gender ? "Nam" : "Nữ" }}</div>
           
          </li>
        </ul>
      </div> -->
    </div>

  </div>
</template>

<script>

import Navbar from "../../../components/Navbar.vue";
import Tableft from "../../../components/Tableft.vue";

export default {
  components: {
    Tableft,
    Navbar,

  },
  data() {
    return {
      items: [{
       
      }
      ]

    };
  },
  mounted() {

  },
  methods: {

  },


};
</script>



<style scoped>
.container {
  margin-left: 280px;
}


.family {
  padding: 20px 0 20px 0;
  box-shadow: 3px 3px 10px rgb(206, 203, 203);
  border-radius: 10px;
  background-color: #fff;

}

.family h2 {
  top: -30px;
  text-align: left;
  padding-left: 30px;


}

body {
  font-family: "lato", sans-serif;
}



h2 {
  font-size: 26px;
  margin: 50px 0 80px 0;
  text-align: center;
}

h2 small {
  font-size: 0.5em;
}

.responsive-table {
  margin-top: 0;
  padding-top: 0%;
  padding-left: 0;
}

.responsive-table li {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.responsive-table .table-header {
  background-color: rgb(159, 188, 159);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.responsive-table .table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}

.responsive-table .col-0 {
  flex-basis: 10%;
}

.responsive-table .col-1 {
  flex-basis: 10%;
}

.responsive-table .col-2 {
  flex-basis: 15%;
}

.responsive-table .col-3 {
  flex-basis: 10%;
}

.responsive-table .col-4 {
  flex-basis: 10%;
}

.responsive-table .col-6 {
  flex-basis: 10%;
}

.responsive-table .col-5 {
  flex-basis: 25%;
}

.responsive-table div {
  text-align: center;
  cursor: pointer;
}

.table-row:hover {
  color: green;
}
</style>