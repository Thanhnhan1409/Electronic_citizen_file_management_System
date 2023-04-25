<template>
  <div class="container-listInfor">
    <h2 class="title">Danh sách</h2>
    <div class="list-appointment">
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">ID CBCC</div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">Nội dung</div>
        </li>
        <ul
          class="responsive-table content"
          v-for="(item, index) in listTmp"
          :key="item.id_requirement"
        >
          <li class="table-row display">
            <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
            <div class="col col-1" data-label="Số CCCD công dân">
              {{ isNoti ? item.citizen.citizenId : item.author.citizenId }}
            </div>
            <div class="col col-2" data-label="Tên">
              {{ isNoti ? item.citizen.name : item.author.name }}
            </div>
            <div class="col col-3" data-label="Ngày">
              {{ isNoti ? item.date : item.author }}
            </div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isNoti", "listTmp"],
};
</script>

<style scoped src="../../static/asset/styles.css"></style>
<style scoped>
.responsive-table .col-0 {
  flex-basis: 10%;
}

.responsive-table .col-1 {
  flex-basis: 15%;
}

.responsive-table .col-2 {
  flex-basis: 20%;
}

.responsive-table .col-3 {
  flex-basis: 35%;
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
