<template>
    <q-dialog v-model="confirmAnswersPopUpState.popUp" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm"
                    >Estas seguro de querer enviar las respuestas
                    actuales?.</span
                >
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
                <q-btn
                    flat
                    label="Enviar"
                    color="primary"
                    @click="sendAnswers"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { inject } from 'vue';

const emit = defineEmits<{ (e: 'answers-sent', val: boolean): boolean }>();
const confirmAnswersPopUpState: any = inject('confirmAnswersPopUpState');

const sendAnswers = () => {
    emit('answers-sent', true);
};
</script>
