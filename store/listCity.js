
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
});