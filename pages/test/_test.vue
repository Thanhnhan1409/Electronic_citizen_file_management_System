<!-- <template>
  <div class="container">
    <LandingPage />

    <li class="aaa">
      <div class="tableft--option">Yêu cầu</div>

      <ul class="tableft__manage--options">
        <li>Danh sách yêu cầu</li>

        <li>Gửi yêu cầu</li>
      </ul>
    </li>

    <li class="aaa">
      <div class="tableft--option">lời mời</div>

      <ul class="tableft__manage--options">
        <li>1</li>

        <li>2</li>
      </ul>
    </li>

    <li class="aaa">
      <div class="tableft--option">requirement</div>

      <ul class="tableft__manage--options">
        <li>requirement1</li>

        <li>requirement2</li>
      </ul>
    </li>
  </div>
</template>
<script>
import moment from "moment-timezone";

export default {
  data() {
    return {
      selectedDate: "",
      timezoneOffset: "", // định dạng múi giờ
    };
  },
  methods: {
    handleDateChange() {
      const formattedDate = moment(this.selectedDate).format("YYYY-MM-DD");
      const formattedTimezone = moment.tz(this.timezoneOffset).format("Z");
      // Sử dụng formattedDate và formattedTimezone trong yêu cầu API hoặc xử lý dữ liệu ngày tháng
      // ...
    },
  },
};
</script> -->

<template>
    <div>
      <li :show="showLists[0]" @toggle="toggleList(0)">
        <div class="tableft--option">Yêu cầu</div>
        <ul class="tableft__manage--options">
          <li>Danh sách yêu cầu</li>
          <li>Gửi yêu cầu</li>
        </ul>
      </li>
  
      <li :show="showLists[1]" @toggle="toggleList(1)">
        <div class="tableft--option">Yêu cầu</div>
        <ul class="tableft__manage--options">
          <li>Danh sách yêu cầu</li>
          <li>Gửi yêu cầu</li>
        </ul>
      </li>
  
      <li :show="showLists[2]" @toggle="toggleList(2)">
        <div class="tableft--option">Yêu cầu</div>
        <ul class="tableft__manage--options">
          <li>Danh sách yêu cầu</li>
          <li>Gửi yêu cầu</li>
        </ul>
      </li>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        showLists: [false, false, false]
      };
    },
    methods: {
      toggleList(index) {
        this.showLists[index] = !this.showLists[index];
      }
    }
  };
  </script>