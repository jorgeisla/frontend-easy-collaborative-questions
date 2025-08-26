<template>
    <div>
        <div class="q-mx-md q-my-md text-h4" style="color: white">
            Mis Clases
        </div>
        <div class="q-ma-md">
            <div
                v-for="(item, index) in Object.keys(sortedVideos || {})"
                :key="index"
            >
                <div class="text-h6 q-ma-md" style="color: white">
                    {{ item }}
                </div>
                <div class="row">
                    <div
                        v-for="(video, index) in (videos && videos[item]) || []"
                        :key="index"
                        class="col-auto q-mx-md"
                        @click="goToVideo(video.id)"
                    >
                        <q-card
                            class="q-my-md hover-div"
                            style="width: 300px; height: 220px"
                        >
                            <q-img
                                src="/collaboration_students.png"
                                :ratio="16 / 9"
                            />

                            <q-card-section>
                                <div class="text-body2 ellipsis">
                                    {{ video.name }}
                                </div>
                                <q-tooltip>
                                    {{ video.name }}
                                </q-tooltip>
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

const router = useRouter();
const $q = useQuasar();
const videos = ref<{ [key: string]: Video[] }>();

const sortedVideos = computed(() => {
    if (!videos.value) return {};

    return Object.fromEntries(
        Object.entries(videos.value).sort((a, b) => {
            const weekA = parseInt(a[0].split(' ')[1]);
            const weekB = parseInt(b[0].split(' ')[1]);
            return weekB - weekA;
        }),
    );
});

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
    transition:
        background-color 0.3s,
        filter 0.3s;
    cursor: pointer;
}

.hover-div:hover {
    background-color: #ccc; /* Change background color to grey on hover */
    filter: grayscale(25%);
}
</style>
