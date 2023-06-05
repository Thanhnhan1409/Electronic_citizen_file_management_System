<template>
    <div class="container--inforCitizen">
        <div class="overlay-hidden"></div>
        
        <div class="img--personal div-center">
            <img  :src="listInfor.imgUrl" alt="Hình ảnh">
            <span>{{ listInfor.name }}</span>
        </div>
        <div class="infor--content">
            <h2>Thông tin cá nhân</h2>
            <ul class="infor__content--items">
                <li class="content--item div-center">
                    <div class="left">
                        Họ tên:
                        <span>{{ listInfor.name }}</span>
                    </div>
                    <div>
                        Ngày sinh:
                        <span>{{ listInfor.birth }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Giới tính:
                        <span>{{ listInfor.gender? 'Nam': "Nữ"}}</span>
                    </div>
                    <div>
                        Dân tộc:
                        <span>{{ listInfor.ethnic }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Số CCCD:
                        <span>{{ listInfor.citizen_id }}</span>
                    </div>
                    <div>
                        Số hộ khẩu:
                        <span>{{ listInfor.family }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Quốc tịch:
                        <span>{{ listInfor.nationality }}</span>
                    </div>
                    <div>
                        Tôn giáo:
                        <span>{{ listInfor.religion }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Địa chỉ:
                        <span>{{ listInfor.address }}</span>
                    </div>
                    <div>
                       Tham gia NVQS:
                        <span>{{ listInfor.militaryService? "Đã tham gia" : "Chưa tham gia" }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Nghề nghiệp:
                        <span>{{ listInfor.profession }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Điện thoại:
                        <span>{{ listInfor.phone }}</span>
                    </div>
                    <div>
                        Email:
                        <span>{{ listInfor.email }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    
                    <div>
                       Tình trạng hôn nhân:
                        <span>{{ listInfor.married? "Đã kết hôn" : "Chưa kết hôn" }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    props:['listInfor'],

}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul li{
    list-style: none;
    padding: 0;
    margin: 0;
    
}

.overlay-hidden{
    position: fixed;
    left: 0;
    top:0;
    right: 10px;
    bottom: 0;
    z-index: -1;
    background-color: rgb(239, 238, 238);
}

.img--personal{
    margin-left: 50px;
}
.div-center{
    display: flex;
    text-align: center;
    justify-content: flex-start;
    align-items: center;
}
.img--personal img{
    width: 120px;
    height: 140px;
    padding: 10px;
    border-radius: 10px;
}
.img--personal span{
    font-size: 18px;
    font-weight: 550;
}
.infor--content{
    margin:0 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);

}
.infor--content h2{
    margin: 20px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: #4B4545;
}
.infor__content--items{
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