
import { defineStore } from 'pinia';

export const useListTownStore = defineStore('listTown', {
  state: () => {
    return {
        listTown: [],
    }
    
  },
  getters: {
    getListTown() {
      return this.listTown;
    },
  },
});