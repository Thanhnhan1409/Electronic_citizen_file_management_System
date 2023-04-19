<template>
    <div class="container">
        <div class="overlay-hidden"></div>
        <div class="tableft">
            <img class="img--logo" src="../static/images/logo.png" alt="">
            <h3>HỆ THỐNG QUẢN LÝ HỒ SƠ ĐIỆN TỬ CÔNG DÂN</h3>
            <ul class="tableft__list--options">
                <li class="tableft--option">
                    <nuxt-link to="/citizen" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path class="tableft-icon"
                                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                        Trang chủ
                    </nuxt-link>

                </li>
                  <li class="tableft--option manage--option">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                            </svg>
                        Xem thông tin
                        <svg class="manage__icon--arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                            <path
                                d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                        </svg>

                        <ul class="tableft__manage--options">
                            <nuxt-link to="/Citizen/Family" class="link">
                                <li>Thông tin nhân thân</li>
                            </nuxt-link>
                            <nuxt-link to="/citizen/poli" class="link">
                                <li>Thông tin cán bộ</li>
                            </nuxt-link>
                        </ul>
                    </li>
                
              
                <li class="tableft--option">
                    <nuxt-link to="/citizen/requirement/SendRequirement" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>
                        Gửi yêu cầu
                    </nuxt-link>

                </li>
                <li class="tableft--option">
                    <nuxt-link to="" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                        </svg>
                       Thông báo
                    </nuxt-link>
                </li>
                <li class="tableft--option">
                    <nuxt-link to="" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                        </svg>
                        Hẹn lịch
                    </nuxt-link>
                </li>
                <li class="tableft--option">
                     <nuxt-link to="/citizen/opinion" class="link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                    </svg>
                    Đóng góp ý kiến
                    </nuxt-link>
                </li>
            </ul>
            <div @click.prevent="openPopUp" class="tableft-logout link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                Đăng xuất
            </div>
        </div>
        <PopupConfirm @action="logout" :title="title" />
    </div>
</template>
<script>
import PopupConfirm from './PopupConfirm.vue'
export default {
    data() {
        return {
            title: "đăng xuất"
        }
    },
    components: {
        PopupConfirm
    },
    methods: {
        async logout() {
            try {
                console.log('test logout1')
                await this.$axios.get(`http://localhost:8080/api/v1/auth/logout`)
                    .then((res) => {
                        console.log('test logout2')
                        this.$router.push('/')
                    })
            } catch (error) {
                console.log('test logout3')
                console.log(error)
            }

        },
        openPopUp(item) {
            document.querySelector('#overlay').classList.remove('display-hide');
            document.querySelector('#popup--confirm-change').classList.remove('display-hide');
            document.querySelector('#popup--confirm-change').classList.add('display-block');
            document.querySelector('#popup--confirm-change').classList.add('display-block');
            this.idReq = item.id_requirement;
        }
    }
}
</script>
<style scoped>
.link {
    text-decoration: none;
    color: #fff;
}

ul li {
    list-style: none;
    padding: 0;
    margin: 0;
}

.img--logo {
    width: 120px;
    height: auto;
    position: relative;
    left: 70px;
    top: 49px;
    margin-bottom: 30px;
}

.overlay-hidden {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgb(239, 238, 238);
}

.tableft {
    position: fixed;
    width: 252px;
    height: 100%;
    left: 0px;
    top: -2px;
    bottom: -10px;
    background-color: #127E23;
    color: #fff;
    z-index: 9;
}

.tableft h3 {
    font-size: 16px;
    text-align: center;
    padding: 5px 10px;
    margin-bottom: 10px;
}

.tableft__manage--options {
    position: relative;
    top: 10px;
    left: -60px;
    margin-bottom: 10px;
    transition: all 0.5s linear;
}

.tableft__manage--options li {
    padding: 5px 0px 0px 100px;
    width: 162px;
    visibility: hidden;
    opacity: 0;
    display: none;
    transform: translateY(-100%);
    /* animation: manage 0.7s ease forwards; */
}

.manage__icon--arrow {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 215.11px;
    top: 267px;
    transition: all 0.2s linear;
}

.manage--option:hover .tableft__manage--options li {
    opacity: 1;
    visibility: visible;
    display: block;
    transform: translateY(0);
    padding-bottom: 0;
}

.manage--option:hover .manage__icon--arrow {
    transform: rotate(90deg);
}

.manage--option li:hover {
    background-color: #127E23;
    color: #fff;
    
}

svg {
    width: 14px;
    height: auto;
    fill: #ffff;
    margin-right: 10px;
}

.tableft--option {
    padding: 5px 10px 10px 50px;
    font-style: normal;
    line-height: 30px;
    cursor: pointer;
}

.tableft--option:hover {
    background-color: #fff;
    color: #127E23;
    
   
  
    
}

.tableft--option:hover svg {
    fill: #127E23;
}

.tableft--option:hover .link {
    color: #127E23;
    font-weight: 550;
}

.tableft__list--options {
    margin: 0;
    padding: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
}

.tableft-logout {
    padding: 15px 10px 15px 90px;
    display: flex;
    transition: all 0.3s linear;
    position: relative;
    left: -40px;
    width: 192px;
    text-decoration: none;
    color: #fff;
}

.tableft-logout svg {
    width: 20px;
    height: auto;
}

.tableft-logout:hover {
    background-color: #fff;
    color: #127E23;
    transform: translateX(30px);
    font-weight: 600;
    width: 162px;
}

.tableft-logout:hover svg {
    fill: #127E23;
    transform: scale(1.2);

}
</style>