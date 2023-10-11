<template>
    <Suspense>
        <q-layout view="hHh LpR fFr">
            <q-header class="bg-primary text-white">
                <q-toolbar>
                    <q-toolbar-title>
                        <q-btn round to="/student/my-videos">
                            <q-avatar>
                                <img
                                    src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                                />
                            </q-avatar>
                        </q-btn>
                        EasyCollaborativeQuestions
                    </q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-page-container>
                <router-view />
            </q-page-container>
        </q-layout>
    </Suspense>
</template>

<script lang="ts" setup></script>
