
import { defineStore } from 'pinia';

export const useListCityStore = defineStore('listCity', {
  state: () => {
    return {
        listCity: [],
    }
    
  },
  getters: {
    getListCity() {
      return this.listCity;
    },
  },
  actions:{
    setListCity(list){
      this.listCity = list;
      localStorage.setItem('listCity', JSON.stringify(list));
    }
  }
});