<template>
    <div class="logo">
        <img src="../static/logo.jpg" alt="">
        <h1>HỆ THỐNG QUẢN LÝ HỒ SƠ ĐIỆN TỬ CÔNG DÂN</h1>
    </div>
</template>

<script>
export default {
  data(){
    return{
      name:'Nhan'
    }
  }
}
</script>

<style scoped>
body{
  margin: 0;
  box-sizing: border-box;
}

html{
  margin: 0;
  padding: 0;
}

.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
}

img{
  width: 120px;
  height: auto;
  padding: 10px 0;
  margin-right: 50px;
}

.logo span{
  font-size: 30px;
  font-weight: 660;
}

</style>