<template>
    <div class="container-criminal">
        <div class="content">
            <h2>Tiền án, tiền sự</h2>
        <div class="content-crim">
            {{criminalRecord}}
        </div>
        </div>
        
    </div>
</template>
<script>
export default{
    props:['criminalRecord']
}
</script>

<style scoped>
h2{
    margin: 20px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #4B4545;
}
.content{
    margin: 0 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 13px;
    margin-bottom: 70px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);
}
.container-criminal{
    margin-top: 50px;
}
.content-crim{
    box-shadow: 3px 2px 10px rgb(217, 213, 213);
    /* background-color: #e4e4e4; */
    min-height: 70px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 10px 20px;
    /* border: 1px solid ; */
} 
</style>
