<template>
    <q-dialog v-model="reportQuestionPopUpState">
        <q-card style="max-width: 70%; text-align: left">
            <q-card-section>
                <div class="text-h4 q-pa-md" style="position: relative">
                    Reportar pregunta
                </div>
            </q-card-section>
            <q-separator />

            <q-form class="q-gutter-md" @submit="reportQuestion">
                <q-card-actions>
                    <q-input
                        v-model="text"
                        filled
                        autogrow
                        label="Motivo del reporte..."
                    />
                </q-card-actions>
                <q-card-actions align="right">
                    <q-btn
                        label="Enviar reporte"
                        color="primary"
                        type="submit"
                        v-close-popup
                    />
                </q-card-actions>
            </q-form> </q-card
    ></q-dialog>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Question } from 'src/models/video/pop-up';
import { api } from 'src/boot/axios';
import { createReport } from 'src/endpoints/reports';
const $q = useQuasar();
const props = defineProps<{
    question: Question | null;
}>();

const reportQuestionPopUpState: any = inject('reportQuestionPopUpState');
const text = ref();
const reportQuestion = async () => {
    try {
        const payload = {
            question: props.question?.id,
            description: text.value,
        };
        const { data, status } = await api.post(createReport(), payload);

        if (status !== 201) {
            $q.notify({
                message: 'Pregunta reportada.',
                color: 'green',
                position: 'top',
            });
        }
        return false;
    } catch (error) {
        $q.notify({
            message: 'Error al reportar la pregunta.',
            color: 'red',
            position: 'top',
        });
    }
};
</script>
