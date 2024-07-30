import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { userStore } from 'src/stores/user-store';
import { Notify } from 'quasar';
import { validateToken } from 'src/endpoints/user';
const store = userStore();

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });
api.interceptors.request.use(async (config) => {
    const token = store.getToken;
    if (token) {
        config.headers.Authorization = `Token ${token}`;
        try {
            const headers = { Authorization: 'Token ' + token };
            await axios.get(validateToken(), { headers });
            return config;
        } catch (error) {
            store.clearAll();
            Notify.create({
                message: 'Session expired. Please login again.',
                color: 'negative',
                position: 'top',
            });
        }
    }
    return config;
});

const apiWithoutToken = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app, router }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export { api, apiWithoutToken };
