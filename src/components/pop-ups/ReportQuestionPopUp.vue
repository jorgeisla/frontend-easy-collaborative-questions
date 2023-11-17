<template>
    <q-dialog v-model="reportQuestionPopUpState">
        <q-card style="max-width: 70%; text-align: left">
            <q-card-section>
                <div class="text-h4 q-pa-md" style="position: relative">
                    Reportar pregunta
                </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="right">
                <q-input v-model="text" filled type="textarea" />
            </q-card-actions>
            <q-card-actions align="right">
                <q-btn
                    label="Responder"
                    color="primary"
                    @click="reportQuestion()"
                />
            </q-card-actions> </q-card
    ></q-dialog>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue';

const reportQuestionPopUpState: any = inject('reportQuestionPopUpState');
const text = ref();
const reportQuestion = async () => {
    return true;
};
</script>
