import { defineStore } from "pinia";

const state = () => {
  return {
    users: [],
  };
};

const getters = {
  getUsers: (store) => {
    return store.users;
  },
};

const actions = {
  setUsers(data) {
    this.users = data;
  },
  addUser(data) {
    this.users.push(data);
  },
  removeUser(data) {
    this.users = this.users.filter((item) => {
      return item.name !== data.name && item.dob !== data.dob;
    });
  },
};

export const useMainStore = defineStore("main", {
  state,
  getters,
  actions,
});
