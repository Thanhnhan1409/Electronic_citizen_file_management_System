<template>
    <div class="container">
        <div class="nav-bar">
            <div @click.prevent="changePassVisible" class="nav__name-user">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <span style="width: 120px;">Phan Thị Thanh Nhàn</span>
                <nuxt-link to="/poli/changePass/" v-show="isShow" class="nav__change-pass">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    <p>Đổi mật khẩu</p>
                </nuxt-link>
                
            </div>
            <svg @click.prevent="logout" class="icon--logout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            isShow:false,
        }
    },
    props:['name'],
    methods:{
        logout(){
            localStorage.clear();
            localStorage.removeItem("auth._token.local");
            //login=>index
            this.$router.push("/");
        },
        changePassVisible(){
            this.isShow = !this.isShow;
        },
    }
}
</script>
<style scoped>
.container{
    /* margin-left: 280px; */
}
.nav-bar{
    text-align: end;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    padding: 7px 10px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 8;
    box-shadow: 3px 3px 10px rgb(210, 208, 208);
}
.nav__name-user{
    cursor: pointer;
}
.nav__name-user svg{
    width: 16px;
    height: auto;
    padding-right: 7px;
}
.nav__change-pass{
    position: absolute;
    right: 75px;
    top: 30px;
    transition: all 0.5 linear;
    /* display: none; */
    /* transform: translateY(100%); */

}
.change-pass--visible{
    display: block !important;
    transform: translateY(0%) !important;
}
.nav__change-pass p{
    padding: 5px 10px;
    /* border-radius: 10px; */
    background-color: #127E23;
    color: #fff;
    margin: 0;
    width: 100px;
    position: absolute;
    right: -4px;
    top: 12px;
    text-align: start;
}
.nav__change-pass svg{
    fill: #127E23;
    position: absolute;
    right: 90px;
    top: 2px;
    width: 13px;
    height: auto;
}
.icon--logout{
    padding-left: 10px;
    width: 18px;
    height: auto;
    cursor: pointer;
}
</style>