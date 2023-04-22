<template>
  <div class="container">
    <div class="container-listInfor">
      <h2 class="title">Danh sách lịch hẹn</h2>
      <div class="list-appointment">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-0">STT</div>
            <div class="col col-1">ID CBCC</div>
            <div class="col col-2">Tên</div>
            <div class="col col-3">Ngày</div>
            <div class="col col-4">Bắt đầu</div>
            <div class="col col-5">Kết thúc</div>
            <div class="col col-6">Nội dung</div>
            <div class="col col-7">Trạng thái</div>
          </li>
          <ul class="responsive-table content">
            <li class="table-row display">
              <div class="col col-0" data-label="STT">123</div>
              <div class="col col-1" data-label="Số CCCD công dân">{123</div>
              <div class="col col-2" data-label="Tên">123</div>
              <div class="col col-3" data-label="Ngày">123</div>
              <div class="col col-4" data-label="Bắt đầu">4h</div>
              <div class="col col-5" data-label="Kết thúc">12h</div>
              <div class="col col-6" data-label="Nội dung">conntetn</div>
              <div class="col col-7" data-label="Trạng thái"></div>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isNoti", "listTmp"],
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.title {
  position: absolute !important;
  font-size: 22px;
  margin: 50px 0 60px 0;
  z-index: 2;
  color: #4b4545;
  left: 20px;
  top: 20px;
}
.responsive-table .col-0 {
  flex-basis: 10%;
}

.responsive-table .col-1 {
  flex-basis: 15%;
}

.responsive-table .col-2 {
  flex-basis: 10%;
}

.responsive-table .col-3 {
  flex-basis: 10%;
}
.responsive-table .col-4 {
  flex-basis: 10%;
}

.responsive-table .col-5 {
  flex-basis: 10%;
}

.responsive-table .col-6 {
  flex-basis: 20%;
}

.responsive-table .col-7 {
  flex-basis: 10%;
}
.list-appointment{
    margin-top: 60px;
  /* margin-left: 10px; */
  padding: 100px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 97%;
}
</style>
