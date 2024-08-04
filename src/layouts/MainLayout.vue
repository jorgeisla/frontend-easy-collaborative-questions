<template>
    <Suspense>
        <q-layout view="hHh LpR fFr">
            <q-header class="bg-primary text-white" id="layout-student">
                <q-toolbar>
                    <q-toolbar-title>
                        <q-btn round to="/student/my-videos">
                            <q-avatar>
                                <img src="logo.png" />
                            </q-avatar>
                        </q-btn>
                        Collaborative Questions
                    </q-toolbar-title>
                    <q-btn-dropdown color="teal" rounded label="Sesión">
                        <q-list>
                            <q-item
                                clickable
                                v-close-popup
                                @click="myClasses()"
                            >
                                <q-item-section>
                                    <q-item-label> Mis clases</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item
                                clickable
                                v-close-popup
                                @click="changePassword()"
                            >
                                <q-item-section>
                                    <q-item-label
                                        >Cambiar contraseña</q-item-label
                                    >
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="logout()">
                                <q-item-section>
                                    <q-item-label>Cerrar sesión</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-toolbar>
            </q-header>

            <q-page-container>
                <router-view />
            </q-page-container>
        </q-layout>
    </Suspense>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { userStore } from 'src/stores/user-store';

const router = useRouter();

const logout = () => {
    userStore().clearAll();
    router.push('/');
};

const changePassword = () => {
    router.push({ name: 'ChangePassword' });
};

const myClasses = () => {
    router.push({ name: 'MyVideos' });
};
</script>
