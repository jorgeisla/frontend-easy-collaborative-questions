<template>
    <div class="q-ma-md row" v-for="(item, index) in videos" :key="index">
        <div class="col-5 q-ma-md" style="max-width: 400px">
            <q-btn :to="`watch/${item.id}`">
                <q-card>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />

                    <q-card-section>
                        <div class="text-h6">{{ item.name }}</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none"> </q-card-section>
                </q-card>
            </q-btn>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { crudVideoApi } from 'src/endpoints/video';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();
const videos = ref<Video[]>([]);

const listAllVideos = async () => {
    try {
        const { data, status } = await axios.get(crudVideoApi());
        if (status !== 200) {
            $q.notify({
                message: 'Error en la conexión con el servidor.',
                color: 'red',
            });
        }
        videos.value = data;
    } catch (e) {
        $q.notify({
            message: 'Error al listar videos',
            color: 'red',
        });
    }
};
await listAllVideos();
</script>
