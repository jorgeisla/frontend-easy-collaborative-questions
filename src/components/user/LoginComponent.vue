<template>
    <q-card class="q-pa-md" style="background-color: white">
        <div style="padding: 20px">
            <div
                style="
                    margin-bottom: 50px;
                    padding-top: 20px;
                    align-items: center;
                    text-align: center;
                    font-weight: 500;
                    font-size: 30px;
                    color: black;
                "
            >
                Collaborative Questions
            </div>
            <q-form class="q-gutter-md" @submit="login" style="">
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
                        text-color="white"
                        label="Ingresar"
                        size="md"
                        type="submit"
                        style="background-color: rgba(0, 210, 255)"
                    />
                </div>
            </q-form>
        </div>
    </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { userLogin } from 'src/endpoints/user';
import { userStore } from 'src/stores/user-store';
import { UserLoginResponse } from 'src/models/user/user';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

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
        const { data, status } = await api.post<UserLoginResponse>(
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
            router.push({ name: 'MyVideos' });
        }
    } catch {
        $q.notify({
            message: 'Error al iniciar sesión, verifique usuario y contraseña.',
            color: 'red',
            position: 'top',
        });
    }
};
</script>
