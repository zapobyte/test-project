import { defineStore } from 'pinia';

const state = () => ({
  users: [],
});

const getters = {
  getUsers: (store) => store.users,
};

const actions = {
  setUsers(data) {
    this.users = data;
  },
  addUser(data) {
    this.users.push(data);
  },
  editUser(data) {
    this.users = this.users.map((item)=> {
      if(item.id === data.id) {
        return data;
      }
      return item;
    });
  },
  removeUser(data) {
    this.users = this.users.filter((item) => item.id !== data.id);
  },
};

export const useMainStore = defineStore('main', {
  state,
  getters,
  actions,
});
