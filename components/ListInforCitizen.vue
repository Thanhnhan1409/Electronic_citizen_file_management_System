<template>
    <div >
        <ul class="responsive-table">
            <li class="table-header">
                <div class="col col-0">STT</div>
                <div class="col col-1">Số CCCD</div>
                <div class="col col-2">Tên</div>
                <div class="col col-3">Giới tính</div>
                <div class="col col-4">Số điện thoại</div>
                <div class="col col-5">Địa chỉ</div>
            </li>
        </ul>
        <ul class="responsive-table content" v-for="item in items" :key="item.id">
            <li class="table-row display" @click.prevent="handleClick(item.citizen_id)">
                <div class="col col-0" data-label="STT">1</div>
                <div class="col col-1" data-label="Số CCCD">
                    {{ item.citizen_id }}
                </div>
                <div class="col col-2" data-label="Tên">{{ item.name }}</div>
                <div class="col col-3" :keyup=gender(item.gender) data-label="Giới tính">{{ genderEx }}</div>
                <div class="col col-4" data-label="Số điện thoại">
                    {{ item.phone }}
                </div>
                <div class="col col-5" data-label="Địa chỉ">{{ item.address }}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    genderEx:{
        type:String,
        default:''
    }
  },
  methods:{
    handleClick(id){
      this.$emit('handleClick',id);
    },
    gender(gender){
      this.$emit('gender',gender);
    }
  }
}
</script>

<style scoped>

body {
font-family: "lato", sans-serif;
}

h2 {
font-size: 26px;
margin: 50px 0 80px 0;
text-align: center;
}

h2 small {
font-size: 0.5em;
}

.responsive-table {
padding-left: 0;
}

.responsive-table li {
border-radius: 3px;
padding: 25px 30px;
display: flex;
justify-content: space-between;
margin-bottom: 25px;
}

.responsive-table .table-header {
background-color: rgb(159, 188, 159);
font-size: 14px;
text-transform: uppercase;
letter-spacing: 0.03em;
}

.responsive-table .table-row {
background-color: #ffffff;
box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}

.responsive-table .col-0 {
flex-basis: 10%;
}

.responsive-table .col-1 {
flex-basis: 10%;
}

.responsive-table .col-2 {
flex-basis: 15%;
}

.responsive-table .col-3 {
flex-basis: 10%;
}

.responsive-table .col-4 {
flex-basis: 10%;
}

.responsive-table .col-6 {
flex-basis: 10%;
}

.responsive-table .col-5 {
flex-basis: 25%;
}

.responsive-table div {
text-align: center;
cursor: pointer;
}

</style>