<template>
        <div class="download-area">
        <div class="download">
        <p>Download</p>
      </div>
      <div class="download-box">
          <button class="download-button" @click="downloadPDF">
            Download Excel
          </button>
          <button class="download-button" @click="downloadPDF">
            Download PDF
          </button>
        </div>
      </div>
</template>

<script>
export default{
    props:['urlDownloadPDF','urlDownloadXLS'],
    methods:{
        // downloadPDF(){
        //     this.$emit('downloadPDF')
        // },
        // downloadExcel(){
        //     this.$emit('downloadExcel')
        // }
        async downloadPDF() {
      try {
        const res = await this.$axios.get(
          `${this.urlDownloadPDF}`,
          { responseType: "blob" }
        );
        const blobUrl = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
    },
    async downloadExcel() {
      try {
        const res = await this.$axios.get(
          `${this.urlDownloadXLS}`,
          { responseType: "blob" }
        );
        const blobUrl = window.URL.createObjectURL(
          new Blob([res.data], {  type: "application/vnd.ms-excel" })
        );
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "file.xls");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
    },
    }
}
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style>
.button-show {
  position: absolute;
  top: 80px;
  left: 20px;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
  transition: all 0.2s ease;
}
.button-show:hover {
  transform: scale(1.03);
  box-shadow: 3px 3px 10px 3px rgb(221, 221, 221);
}
.download-area{
  position: absolute;
  right: 20px;
  top: 30px;
  z-index: 6;
}
.download-button {
  padding: 5px 10px;
  background-color: #fff;
  cursor: pointer;
  width: 100%;
  border: none;
  /* border: 1px solid #127e23; */

}
.download-button:hover{
  background-color: #127e23;
  color: #ffff;
}
.download{
  padding: 5px 10px;
    border: 1px solid #127e23;
    width: 150px;
    text-align: center;
    /* border-radius: 5px */
}
.download:hover{
  background-color: #127e23;
  color: #fff;
}
.download-box{
  display: none;
  width: 170px;
  border: 1px solid #127e23;
  transition: all 0.2s ease;
}
.download-box:hover{
  display: block;
}
.download:hover + .download-box {
  display: block;
}
</style>