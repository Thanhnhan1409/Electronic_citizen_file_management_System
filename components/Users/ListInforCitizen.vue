<template>
    <div class="class-list" >
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
        <ul class="responsive-table content" v-for="(item,index) in items" :key="index">
            <li class="table-row display" @click.prevent="handleClick(item.citizen_id)">
                <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
                <div class="col col-1" data-label="Số CCCD">
                    {{ item.citizen_id }}
                </div>
                <div class="col col-2" data-label="Tên">{{ item.name }}</div>
                <div class="col col-3" data-label="Giới tính">{{ item.gender? "Nam": "Nữ" }}</div>
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
    }
  },
  methods:{
    handleClick(id){
      this.$emit('handleClick',id);
    }
  }
}
</script>

<style scoped src="../../static/asset/styles.css"></style>
<style scoped>
body {
font-family: "lato", sans-serif;
}

h2 {
font-size: 26px;
margin: 50px 0 80px 0;
text-align: center;
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
.table-row:hover{
  font-weight: 600;
  text-decoration: underline;
  color: green;
}
</style>