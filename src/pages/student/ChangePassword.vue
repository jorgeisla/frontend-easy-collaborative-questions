<template>
    <q-page class="flex flex-center">
        <q-card class="q-pa-md">
            <q-card-section>
                <q-form @submit="changePasswordMethod">
                    <q-input
                        v-model="password"
                        label="Password"
                        type="password"
                    />
                    <q-input
                        v-model="confirmPassword"
                        label="Confirm Password"
                        type="password"
                    />
                    <q-btn type="submit" label="Change Password" />
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { changePassword } from 'src/endpoints/user';
import { useRouter } from 'vue-router';

const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const changePasswordMethod = async () => {
    await api.post(changePassword(), {
        password: password.value,
        confirmPassword: confirmPassword.value,
    });
    router.push({ name: 'MyVideos' });
};
</script>
