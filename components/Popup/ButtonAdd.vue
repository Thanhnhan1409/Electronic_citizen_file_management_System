<template>
    <div @click.prevent="showAddApp" class="add-notification">
        <svg
          class="icon-plus"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"
          />
        </svg>
        <p>{{ title }}</p>
      </div>
</template>

<script>
export default{
    props:[ 'title'],
    methods:{
        showAddApp(){
            this.$emit('showAddApp')
        }
    }
}
</script>

<style>
.add-notification {
  /* box-shadow: 3px 3px 10px 2px rgb(231, 226, 226); */
  border: 1px solid #127e23;
  position: absolute;
  display: flex;
  padding: 7px 15px;
  border-radius: 10px;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  right: 45px;
  top: 45px;
  margin-right: 20px;
  background-color: #ffffff;
  transition: all 0.2s linear;
  cursor: pointer;
  z-index: 3;
}
.icon-plus {
  width: 16px;
  height: auto;
  transition: all 0.2s linear;

  /* fill: #fff; */
  padding-right: 7px;
}
.add-notification:hover{
    background-color: #127e23;
    color: #fff;
}
.add-notification:hover .icon-plus {
    fill: #ffff;
}
.add-notification p{
  margin: 0;
}
</style>