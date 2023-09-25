<template>
    <q-card class="q-pa-md">
        <q-form class="q-gutter-md" @submit="login">
            <q-input
                v-model="username"
                filled
                label="Usuario"
                :rules="usernameRules"
            ></q-input>
            <q-input
                v-model="password"
                type="password"
                filled
                label="Contraseña"
                :rules="passwordRules"
            ></q-input>
            <div class="text-center">
                <q-btn
                    color="white"
                    text-color="black"
                    label="Ingresar"
                    size="md"
                    type="submit"
                />
            </div>
        </q-form>
    </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { userLogin } from 'src/endpoints/user';
import { userStore } from 'src/stores/user-store';
import { UserLoginResponse } from 'src/models/user/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const $q = useQuasar();
const loginEndpoint = userLogin();
const store = userStore();

const usernameRules = [
    (val: string) => (val && val.length > 0) || 'Ingrese su usuario',
];
const passwordRules = [
    (val: string) => (val && val.length > 0) || 'Ingrese su contraseña',
];

const login = async () => {
    try {
        const { data, status } = await axios.post<UserLoginResponse>(
            loginEndpoint,
            {},
            {
                auth: {
                    username: username.value,
                    password: password.value,
                },
            }
        );
        if (status !== 200) {
            $q.notify({
                message: 'Error al ingresar',
                color: 'red',
            });
        } else {
            store.setUserData(data.token, data.user.username, data.user.email);
            $q.notify({
                message: 'Login realizado con exito.',
                color: 'green',
                position: 'top',
            });
            router.push({ name: 'WatchVideo' });
        }
    } catch {
        $q.notify({
            message: 'Ha ocurrido un error en la comunicacion con el servidor.',
            color: 'red',
            position: 'top',
        });
    }
};
</script>
