<template>
  <div class="container-listInfor">
    <div class="list-appointment">
      <h2 class="title">Danh sách {{ title }}</h2>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">
            {{ object === "notification" ? "ID CBCC" : "Tên" }}
          </div>
          <div class="col col-2" v-if="object === 'notification'">Tên</div>
          <div
            class="col col-3"
            :style="{
              'flex-basis': object === 'notification' ? '35%' : '45 %',
            }"
          >
            Nội dung
          </div>
        </li>
        <ul
          class="responsive-table content"
          v-for="(item, index) in listTmp"
          :key="index"
        >
          <li class="table-row display">
            <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
            <div class="col col-1" data-label="Số CCCD công dân">
              {{
                object === "notification"
                  ? item.politician.politicianId
                  : item.citizen.name
              }}
            </div>
            <div
              v-if="object === 'notification'"
              class="col col-2"
              data-label="Tên"
            >
              {{
                object === "notification"
                  ? item.politician.citizen.name
                  : item.citizen.name
              }}
            </div>
            <div
              class="col col-3"
              :style="{
                'flex-basis': object === 'notification' ? '35%' : '45 %',
              }"
              data-label="Ngày"
            >
              {{ object === "notification" ? item.message : item.content }}
            </div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["object", "listTmp", "title"],
};
</script>
<style scoped src="~/static/asset/styles.css"></style>
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
  flex-basis: 45%;
}
.list-appointment {
  margin-top: 60px;
  /* margin-left: 10px; */
  padding: 10px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 97%;
  margin-bottom: 50px;
}
</style>
