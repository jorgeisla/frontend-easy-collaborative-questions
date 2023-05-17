<template>
    <q-dialog v-model="state.popUp">
        <q-card style="max-width: 70%">
            <q-card-section>
                <div class="text-h3 q-pa-md">
                    {{ props.question?.questioHeader }}
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div
                    v-for="(item, index) in props.question?.answerOptions"
                    :key="index"
                >
                    <q-radio
                        v-model="selected"
                        size="lg"
                        :val="item.value"
                        :label="item.label"
                        class="text-h6 q-pa-md"
                    />
                </div>
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
import { Question } from 'src/models/video/pop-up';
import { inject, ref } from 'vue';

const props = defineProps<{
    question: Question | null;
}>();

const state: any = inject('state');
const answers: any = inject('answers');

const selected = ref(answers[`${props.question?.id}`] || '');
const toggleDialogOff = () => {
    state.popUp = false;
    if (selected.value !== '') {
        answers[`${props.question?.id}`] = selected;
    }
};
</script>
