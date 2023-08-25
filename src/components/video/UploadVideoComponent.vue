<template>
    <div class="q-pa-md">
        <q-card style="max-width: 960px; margin: auto">
            <q-form @submit="createUploadLinkAction">
                <div class="text-h4 q-pa-md">Subir video</div>
                <q-input
                    class="q-pa-md"
                    filled
                    v-model="videoName"
                    label="Nombre del video"
                    hint="Ingrese nombre del video"
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length > 0) ||
                            'Ingrese nombre del video',
                    ]"
                />
                <q-file clearable outlined v-model="videoInput" class="q-pa-md">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>
                <div class="q-pa-md">
                    <q-btn type="submit">Subir video</q-btn>
                    <div class="progress">
                        <div
                            class="progress-bar"
                            :style="{ width: uploadProgress + '%' }"
                        ></div>
                        <div class="progress-text q-pt-md">
                            {{ uploadProgress }}%
                        </div>
                    </div>
                </div>
            </q-form>
        </q-card>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { createUploadLink, crudVideoApi } from 'src/endpoints/video';
import { useQuasar } from 'quasar';
import { userStore } from 'src/stores/user-store';

const $q = useQuasar();
const videoInput = ref();
const uploadProgress = ref(0);
const videoName = ref('');
const store = userStore();
const token = store.getToken;

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
        const fileName = data[0].file_name;

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
            const videoPayload = { file_name: fileName, name: videoName.value };
            const videoCreationResponse = await axios.post(
                crudVideoApi(),
                videoPayload,
                {
                    headers: { Authorization: `token ${token}` },
                }
            );
            if (videoCreationResponse.status === 201) {
                $q.notify({
                    message: 'Archivo subido con éxito.',
                    color: 'green',
                    position: 'top',
                });
            } else {
                $q.notify({
                    message: 'Error al subir video.',
                    color: 'red',
                    position: 'top',
                });
            }
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
    } finally {
        uploadProgress.value = 0;
    }
};
</script>
