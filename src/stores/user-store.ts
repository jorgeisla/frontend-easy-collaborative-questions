import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const userStore = defineStore('login', {
    state: () => ({
        username: '',
        token: '',
        email: '',
        reminderPopUp: true,
    }),
    getters: {
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
        getEmail: (state) => state.email,
        getReminderPopUp: (state) => state.reminderPopUp,
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
        setReminderPopUp(reminderPopUp: boolean) {
            this.reminderPopUp = reminderPopUp;
        },
        setUserData(token: string, username: string, email: string) {
            this.setToken(token);
            this.setUsername(username);
            this.setEmail(email);
        },
        clearAll() {
            this.setToken('');
            this.setUsername('');
            this.setEmail('');
        },
    },
    persist: true,
});
