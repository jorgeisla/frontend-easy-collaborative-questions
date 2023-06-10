<template>
    <div class="q-pa-md" style="width: 100%; text-align: left">
        <q-list bordered separator>
            <div v-for="(item, index) in props.questions" :key="index">
                <q-item clickable v-ripple @click="questionClick(item.time)">
                    <q-item-section>
                        <q-item-label>{{ item.questioHeader }}</q-item-label>
                        <q-item-label caption>{{
                            formatTime(item.time)
                        }}</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                        <q-item-label caption>5 min ago</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
            </div>
        </q-list>
    </div>
</template>
<script setup lang="ts">
import { Question } from 'src/models/video/pop-up';

const props = defineProps<{
    questions: Question[] | null;
}>();

const emit = defineEmits<{ (e: 'question-click', val: number): number }>();

const questionClick = (id: number) => {
    emit('question-click', id);
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
};
</script>
