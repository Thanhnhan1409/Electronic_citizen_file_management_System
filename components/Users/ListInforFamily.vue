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
        <ul class="responsive-table content" v-for="(item,index) in items" :key="item.citizen_id">
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
    return: {
        item: [],
    },
   
}
</script>

<style>

</style>