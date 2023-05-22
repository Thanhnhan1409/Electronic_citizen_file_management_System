<template>
  <div class="download-area">
    <div class="download" @click="downloadPDF">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
        Tải xuống
    </div>
  </div>
</template>

<script>
export default {
  props: ["urlDownloadPDF"],
  methods: {
    async downloadPDF() {
      try {
        const res = await this.$axios.get(`${this.urlDownloadPDF}`, {
          responseType: "blob",
        });
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
   
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style>

.download-area {
  position: absolute;
  left: 160px;
  top: 72px;
  z-index: 6;
}

.download {
  padding: 3px 7px;
  background-color:  #127e23;
  border-radius: 7px;
  width: 110px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease;
  /* border-radius: 5px */
}
.download:hover {
  transform: scale(1.03);
  box-shadow: 3px 3px 10px 3px rgb(221, 221, 221);

}
.download svg{
  width: 14px;
  height: auto;
  padding-right: 5px;
  fill: #fff;

}
.download:hover svg{
  fill: #fff;
}
</style>
