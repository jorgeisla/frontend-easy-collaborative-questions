<template>
    <q-dialog v-model="state.essayPopUp">
        <q-card style="max-width: 70%; text-align: left">
            <q-card-section>
                <div class="text-h4 q-pa-md" style="position: relative">
                    {{ props.question?.questionHeader }}
                    <q-btn
                        color="red"
                        round
                        size="xs"
                        icon="fa-solid fa-triangle-exclamation"
                        style="position: absolute; top: 0px; right: 0px"
                        @click="reportQuestionPopUpState = true"
                    >
                        <q-tooltip> Reportar pregunta </q-tooltip></q-btn
                    >
                </div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pt-none">
                <q-input
                    autogrow
                    v-model="selected"
                    size="lg"
                    label="Ingrese una respuesta"
                    class="text-h6 q-pa-md"
                />
                <q-separator />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn
                    label="Responder"
                    color="primary"
                    @click="toggleDialogOff()"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <ReportQuestionPopUp :question="props.question"></ReportQuestionPopUp>
</template>
<script setup lang="ts">
import { Question } from 'src/models/video/pop-up';
import { inject, ref, provide } from 'vue';
import ReportQuestionPopUp from './ReportQuestionPopUp.vue';

const props = defineProps<{
    question: Question | null;
}>();

const reportQuestionPopUpState = ref(false);
const state: any = inject('state');
const answers: any = inject('answers');
provide('reportQuestionPopUpState', reportQuestionPopUpState);

const selected = ref(answers[`${props.question?.id}`]);

const toggleDialogOff = () => {
    state.essayPopUp = false;
    if (selected.value !== '') {
        answers[`${props.question?.id}`] = selected.value;
    }
};
</script>
