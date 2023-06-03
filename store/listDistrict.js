import { defineStore } from 'pinia';

export const useListDistrictStore = defineStore('listDistrict', {
  state: () => {
    return {
        listDistrict: [],
    }
    
  },
  getters: {
    getListDistrict() {
      return this.listDistrict;
    },
  },
});