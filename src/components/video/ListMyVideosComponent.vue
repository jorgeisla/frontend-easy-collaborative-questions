<template>
    <div
        style="
            background-image: linear-gradient(
                    rgba(0, 0, 0, 0.7),
                    rgba(0, 0, 0, 0.7)
                ),
                url('collaboration_background.png');
            background-repeat: no-repeat;
            background-size: cover;
            margin: 0%;
            padding: 0%;
            height: 100vh;
        "
    >
        <div
            class="q-mx-md"
            style="
                color: white;
                font-weight: 700;
                font-size: 2.5em;
                padding: 1%;
            "
        >
            Mis Clases
        </div>
        <div class="q-ma-md">
            <div
                v-for="(item, index) in Object.keys(videos || {})"
                :key="index"
            >
                <div
                    style="
                        color: white;
                        font-weight: 700;
                        font-size: 1.5em;
                        padding: 1%;
                    "
                >
                    {{ item }}
                </div>
                <div class="row">
                    <div
                        v-for="(video, index) in (videos && videos[item]) || []"
                        :key="index"
                        class="col-2"
                    >
                        <q-card class="q-ma-sm hover-div">
                            <img src="/collaboration_students.png" />

                            <q-card-section>
                                <div class="text-h6">{{ video.name }}</div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { crudVideoApi } from 'src/endpoints/video';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

const router = useRouter();
const $q = useQuasar();
const videos = ref<{ [key: string]: Video[] }>();

const goToVideo = (id: string) => {
    router.push(`/student/watch/${id}`);
};

const listAllVideos = async () => {
    try {
        const { data, status } = await api.get(crudVideoApi());
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
<style>
.hover-div {
    transition: background-color 0.3s, filter 0.3s;
    cursor: pointer;
}

.hover-div:hover {
    background-color: #ccc; /* Change background color to grey on hover */
    filter: grayscale(25%);
}
</style>
