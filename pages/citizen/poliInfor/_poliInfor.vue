<template>
  <div class="container">
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
            
        }
    },
    mounted(){

    },
    methods:{
      async getListPoli(){
        await this.$axios.get(``)
      }
    }
}
</script>
