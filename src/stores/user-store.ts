import { defineStore } from 'pinia';

export const userStore = defineStore('login', {
    state: () => ({
        username: '',
        token: '',
        email: '',
    }),
    getters: {
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
        getEmail: (state) => state.email,
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUsername(username: string) {
            this.username = username;
        },
        setEmail(email: string) {
            this.email = email;
        },
        setUserData(token: string, username: string, email: string) {
            this.setToken(token);
            this.setUsername(username);
            this.setEmail(email);
        },
    },
    persist: true,
});
