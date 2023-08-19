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

const username = ref('');
const password = ref('');
const $q = useQuasar();
const loginEndpoint = userLogin();

const usernameRules = [
    (val: string) => (val && val.length > 0) || 'Ingrese su usuario',
];
const passwordRules = [
    (val: string) => (val && val.length > 0) || 'Ingrese su contraseña',
];

const login = async () => {
    try {
        console.log(loginEndpoint);
        const { data, status } = await axios.post(
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
            $q.notify({
                message: 'Login realizado con exito.',
                color: 'green',
                position: 'top',
            });
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
