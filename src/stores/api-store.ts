import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify, LocalStorage } from 'quasar';

export const useApiStore = defineStore('api', {
  state: () => ({
    API_URL: 'http://localhost:3000/login',
    user: {},
  }),
  actions: {
    async login(username:string, password:string) {
      const data = {
        username,
        password,
      };

      api.post(this.API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        LocalStorage.set('user', username);
        Notify.create({
          type: 'positive',
          message: 'Acceso correcto',
        });
      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: `Ocurrió un error al intentar login ${error}`,
        });
      });
    },
  },
});
