<template>
    <div class="container">
        <div class="overlay-hidden"></div>
        <div class="img--personal div-center">
            <img  src="../static/images/logo.png" alt="">
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
                        <span :keyup="gender(listInfor)">{{ genderEx }}</span>
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
                        <span>{{ listInfor.family?.id_Family }}</span>
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
                    <div>
                        Quê quán:
                        <span>{{ listInfor.address }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Nghề nghiệp:
                        <span></span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Điện thoại:
                        <span>{{ listInfor.address }}</span>
                    </div>
                    <div>
                        Email:
                        <span>{{ listInfor.email }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    
                    <div>
                       Tình trạng hôn nhân:
                        <span></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    props:['listInfor', 'genderEx'],
    methods: {
      gender(list) {
        this.$emit('gender',list)
      },
    },
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
.container{
    margin-left: 280px;
}
.overlay-hidden{
    position: fixed;
    left: 0;
    top:0;
    right: 0;
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
    height: 180px;
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
    font-family: 'Segoe UI Variable';
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