<template>
    <q-dialog v-model="state.essayPopUp">
        <q-card style="max-width: 70%; text-align: left">
            <q-card-section>
                <div class="text-h3 q-pa-md">
                    {{ props.question?.questionHeader }}
                </div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pt-none">
                <q-input
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
</template>
<script setup lang="ts">
import { stat } from 'fs';
import { Question } from 'src/models/video/pop-up';
import { inject, ref } from 'vue';

const props = defineProps<{
    question: Question | null;
}>();

const state: any = inject('state');
const answers: any = inject('answers');

const selected = ref(answers[`${props.question?.id}`]);

const toggleDialogOff = () => {
    state.essayPopUp = false;
    if (selected.value !== '') {
        answers[`${props.question?.id}`] = selected.value;
    }
};
</script>
