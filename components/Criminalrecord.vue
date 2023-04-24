<template>
    <div class="container">
        <div class="content">
            <h2>Tiền án, tiền sự</h2>
            <div class="content-crim">
                {{ listInfor.criminalRecord }}
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: ['listInfor']
}
</script>
<style scoped>
@import url('static\asset\styles.css');
* {
    font-family: Mulish;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
  position: fixed;
 
  bottom:15%;
 font-weight: 600;
    font-size: 18px;
    right: 70px;
   width: 91.5%;
  height: 1%;
  padding: 0px 56px 50px 96px;
  left: 2.8%;
  z-index: -1;
 
    align-items: center;
   
    cursor: pointer;
 
}

h2 {
    margin-bottom: 0px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #4B4545;
    border: 0;
}

.content {
    margin: 0 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 13px;
    margin-bottom: 0px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);
    font-size: 16px;
     font-family: 'Mulish';
      color: #4B4545;
}

.content-crim {
  
    top: 0;
    margin: 0px 0px 30px 30px;
   

    
}</style>
