<template>
  <div>
    aaa
    <p v-for="item in list" :key="item">
      {{ item }}
    </p>
    
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store/index.js';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      message: "",
      list: {},
      id: '',
    };
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.fectchData();
  },
  methods: {
    async fectchData() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.id}`
          )
          .then((res) => {
            this.list = res['data'];
            localStorage.setItem('name', this.list.name)
          });
      } catch (error) {
        console.log(error);
      }
    },
    checkAuth(){
      if(this.list.role !== 'CITIZEN')
      {
        alert("Không đúng")
      }
    }
  },
  
};
</script>


