<template>
    <div class="container--inforPoli">
        <div class="poli--content">
            <h2>Thông tin cán bộ:</h2>
            <ul class="poli__content--items">
                <li class="content--item div-center">
                    <div class="left">
                        Mã cán bộ:
                        <span>{{listPoli.politicianId}}</span>
                    </div>
                    <div>
                        Khu vực:
                        <span>{{listPoli.areaManage}}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Cấp vụ:
                        <span>{{listPoli.levelManagerVN}}</span>
                    </div>
                    <div>
                        Chức danh:
                        <span>{{listPoli.position}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>  
</template>
<script>
export default{
    props:['listPoli']
}
</script>

<style scoped src="../../static/asset/styles.css"></style>
<style scoped>

ul li{
    list-style: none;
    padding: 0;
    margin: 0;
    
}

.poli--content{
    margin:50px 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);
}
.poli--content h2{
    /* font-family: 'Segoe UI Variable'; */
    margin: 20px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: #4B4545;
}
.poli__content--items{
    padding: 30px 40px;
}
.content--item {
    padding: 10px 5px;
    border-bottom: 1.2px solid #CDCDCD;
    transform: matrix(1, 0, 0, 1, 0, 0);
}
.content--item div{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #4B4545;
}
.left{
    width: 50%;
    text-align: initial;
}
</style>