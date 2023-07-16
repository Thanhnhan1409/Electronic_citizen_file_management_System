<template>
  <div class="container">
    <Navbar :userName="name" />
    <h2 class="title">
      Danh sách những người chưa tham gia nghĩa vụ quân sự tại {{ nameArea }}
    </h2>
    <ButtonDownload :urlDownloadPDF="urlDownloadPDF" class="download--PDF" />
    <div class="list-militariers">
      <ul class="responsive-table req-content">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">Số CCCD</div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">Ngày sinh</div>
          <div class="col col-4">Địa chỉ</div>
        </li>
        <ul
          class="responsive-table content"
          v-for="(item, index) in listMilitarier"
          :key="index"
        >
          <li class="table-row display" @click="handleClick(item.citizenId)">
            <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
            <div class="col col-1" data-label="Số CCCD công dân">
              {{ item.citizenId }}
            </div>
            <div class="col col-2" data-label="Tên">{{ item.name }}</div>
            <div class="col col-3" data-label="Ngày sinh">{{ item.birth }}</div>
            <div class="col col-4" data-label="Địa chỉ">{{ item.address }}</div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listMilitarier: [],
      idPoli: null,
      nameArea: "",
      idPoli: null,
      name: "",
      urlDownloadPDF:""
    };
  },
  mounted() {
    this.nameArea = localStorage.getItem("nameArea");
    this.getListMilitarier();
    this.idPoli = localStorage.getItem("idPolicitian");
    this.name = localStorage.getItem("name");
    this.urlDownloadPDF =  `http://localhost:8080/api/citizen/export-to-pdf/militaryService/poliId=${this.idPoli}`;
  },
  methods: {
    async getListMilitarier() {
      try {
        console.log("test militarie");
        this.idPoli = localStorage.getItem("idPolicitian");
        console.log("aaa" + this.idPoli);
        await this.$axios
          .get(
            `http://localhost:8080/api/citizen/report/militaryService/poliId=${this.idPoli}`
          )
          .then((res) => {
            this.listMilitarier = res.data.list;
            // localStorage.setItem('countMilitariers',res.data.count)
          });
      } catch (error) {
        console.log(error);
      }
    },
    handleClick(citizenId) {
      localStorage.setItem("idCitizenOfSeeInforCitizen", citizenId);
      this.$router.push("/poli/viewInforCitizen/inforCitizen");
      console.log(this.idCitizen);
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.list-militariers {
  background-color: #fff;
  padding: 30px;
  margin-right: 30px;
  border-radius: 10px;
  padding: 100px 0 50px 0;
}
.title {
  font-size: 22px;
  position: absolute !important;
  margin: 0;
  left: 20px;
  top: 20px;
  color: #4b4545;
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
  flex-basis: 15%;
}

.responsive-table .col-4 {
  flex-basis: 27%;
}
.table-row:hover {
  font-weight: 600;
  text-decoration: underline;
  color: #127e23;
}
.download--PDF {
  position: absolute;
  left: 85%;
  top: 2.8%;
  width: 120px;
}
</style>
