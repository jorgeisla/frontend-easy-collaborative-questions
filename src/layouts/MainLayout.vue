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
                </q-toolbar>
            </q-header>

            <q-page-container>
                <router-view />
            </q-page-container>
        </q-layout>
    </Suspense>
</template>

<script lang="ts" setup></script>
