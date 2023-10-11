<template>
    <div class="q-pa-md" style="width: 100%">
        <q-list bordered separator>
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Respuestas</q-toolbar-title>
            </q-toolbar>
            <div v-for="(item, index) in questions" :key="index">
                <q-item style="text-align: left" clickable v-ripple>
                    <q-item-section>
                        <q-item-label>{{ item.questionHeader }}</q-item-label>
                        <q-item-label caption>{{
                            formatTime(item.time)
                        }}</q-item-label>
                    </q-item-section>
                    <div v-if="answered(item)">
                        <q-item-section side top>
                            <q-item-label caption>Respondido 🟢</q-item-label>
                        </q-item-section>
                    </div>
                    <div v-else>
                        <q-item-section side top>
                            <q-item-label caption
                                >Sin responder 🔴</q-item-label
                            >
                        </q-item-section>
                    </div>
                </q-item>
                <q-separator />
            </div>
        </q-list>
    </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { Question } from 'src/models/video/pop-up';
import { formatTime } from 'src/utils';

const props = defineProps<{
    questions: Question[] | null;
}>();
const answers: any = inject('answers');

const answered = (question: Question) => {
    if (Object.keys(answers).includes(`${question.id}`)) {
        return true;
    }
    return false;
};
</script>
