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
                        type="textarea"
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
const $q = useQuasar();

const reportQuestionPopUpState: any = inject('reportQuestionPopUpState');
const text = ref();
const reportQuestion = () => {
    $q.notify({
        message: 'Pregunta reportada.',
        color: 'green',
        position: 'top',
    });
    return false;
};
</script>
