<template>
    <div class="container">
        <Navbar :userName = "name" />

        <ListInfor4Colums
        :object="'notification'"
        :listTmp="listTmp"
        :title="'các thông báo'"
        />
    </div>
</template>

<script>
export default{
    data(){
        return {
            listTmp:{},
            id: null,
            name:''
        }
    },
    mounted(){
        this.id = localStorage.getItem('id')
        this.getListNotification()
        this.name = localStorage.getItem('name')
    },
    methods:{
        async getListNotification(){
            
            await this.$axios
            .get(`http://localhost:8080/api/notification/citizenId=${this.id}`)
            .then((res)=>{
                this.listTmp = res.data;
                // this.name = res.data.politician.citizen.name;
                console.log(this.listTmp);
            })
        }
    }
}
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style>

</style>