<template>
  <div class="container">
    <Navbar :userName = "name" />
    <ListInfor6Colums 
    :listTmp="listPoli" 
    :object="'requirement'" 
    :title="'cán bộ công chức trên cả nước'"
    />
  </div>
</template>

<script>
export default{
    data(){
        return{
            listPoli:[],
            name:''
        }
    },
    mounted(){
      this.name = localStorage.getItem('name')
    },
    methods:{
      async getListPoli(){
        await this.$axios.get(``)
      }
    }
}
</script>
