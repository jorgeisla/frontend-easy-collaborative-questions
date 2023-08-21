<template>
    <div class="q-pa-md">
        <q-file clearable outlined v-model="videoInput">
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
        </q-file>
    </div>
    <q-btn @click="createUploadLinkAction">TEST</q-btn>
    <q-btn @click="getFile">GET FILE</q-btn>
    <div class="progress">
        <div
            class="progress-bar"
            :style="{ width: uploadProgress + '%' }"
        ></div>
        <div class="progress-text">{{ uploadProgress }}%</div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { createUploadLink } from 'src/endpoints/video';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const videoInput = ref();
const uploadProgress = ref(0);

const getFile = () => {
    console.log(videoInput.value);
};
const createUploadLinkAction = async () => {
    try {
        const { data, status } = await axios.post(createUploadLink(), {
            files_extension: ['mp4'],
        });
        if (status !== 200) {
            $q.notify({
                message: 'Error al crear link de subida.',
                color: 'red',
            });
        }
        const presignedUrl = data[0].presigned_url;
        console.log(data);
        console.log(presignedUrl);

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', videoInput.value);

        // Make a PUT request to upload the file to the pre-signed URL
        const response = await axios.put(presignedUrl, formData, {
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const completedPercentage = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    uploadProgress.value = completedPercentage;
                }
            },
        });
        if (response.status === 200) {
            $q.notify({
                message: 'Archivo subido con éxito.',
                color: 'green',
                position: 'top',
            });
        } else {
            $q.notify({
                message: 'Error al subir el archivo.',
                color: 'red',
                position: 'top',
            });
        }
    } catch (e) {
        $q.notify({
            message: 'Ha ocurrido un error en la comunicacion con el servidor.',
            color: 'red',
            position: 'top',
        });
        console.log(e);
    }
};
</script>
