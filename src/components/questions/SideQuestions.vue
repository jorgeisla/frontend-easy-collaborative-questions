<template>
    <div class="q-pa-md" style="width: 100%">
        <q-list bordered separator>
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Preguntas</q-toolbar-title>
                <q-btn
                    color="primary"
                    label="Enviar respuestas"
                    @click="enviarRespuestas()"
                    id="enviar-respuestas-button"
                />
            </q-toolbar>
            <div v-for="(item, index) in discoveredQuestions" :key="index">
                <q-item
                    style="text-align: left"
                    clickable
                    v-ripple
                    @click="questionClick(item.time)"
                >
                    <q-item-section>
                        <q-item-label>{{ item.questioHeader }}</q-item-label>
                        <q-item-label caption>{{
                            formatTime(item.time)
                        }}</q-item-label>
                    </q-item-section>
                    <div v-if="alreadyAnswer(item)">
                        <q-item-section side top>
                            <q-item-label caption>Respondido 👍</q-item-label>
                        </q-item-section>
                    </div>
                </q-item>
                <q-separator />
            </div>
        </q-list>
        <EnviarRespuestasConfirm v-on:answers-sent="handleAnswersSent" />
        <EnviarRespuestasSinResponderTodasLasPreguntasConfirm
            v-on:answers-sent="handleAnswersSent"
        />
    </div>
</template>
<script setup lang="ts">
import { Question } from 'src/models/video/pop-up';
import EnviarRespuestasConfirm from 'src/components/pop-ups/EnviarRespuestasConfirm.vue';
import EnviarRespuestasSinResponderTodasLasPreguntasConfirm from 'src/components/pop-ups/EnviarRespuestasSinResponderTodasLasPreguntasConfirm.vue';
import { ref, inject, provide, reactive } from 'vue';

const props = defineProps<{
    discoveredQuestions: Question[] | null;
    questions: Question[] | null;
}>();
const answers: any = inject('answers');

const confirmAnswersPopUpState = reactive({
    popUp: false,
});

const confirmIncompleteAnswersPopUpState = reactive({
    popUp: false,
});
provide('confirmAnswersPopUpState', confirmAnswersPopUpState);
provide(
    'confirmIncompleteAnswersPopUpState',
    confirmIncompleteAnswersPopUpState
);

const discoveredQuestions = ref(props.discoveredQuestions);

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

const alreadyAnswer = (question: Question) => {
    console.log(answers);
    if (Object.keys(answers).includes(`${question.id}`)) {
        return true;
    }
    return false;
};

const enviarRespuestas = () => {
    checkAllQuestionsAnswered();
    if (!checkAllQuestionsAnswered()) {
        confirmIncompleteAnswersPopUpState.popUp = true;
    }
    confirmAnswersPopUpState.popUp = true;
    console.log('Respuestas enviadas');
};

const handleAnswersSent = () => {
    const enviarRespuestasButton = document.getElementById(
        'enviar-respuestas-button'
    );
    enviarRespuestasButton?.setAttribute('disabled', '');
    return;
};

const checkAllQuestionsAnswered = () => {
    const questionsNumber = props.questions ? props.questions.length : 0;
    const answersNumber = Object.keys(answers).length;
    if (questionsNumber === answers) {
        return true;
    } else if (questionsNumber > answersNumber) {
        return false;
    } else {
        throw new Error('Las respuestas son mas que las preguntas');
    }
};
</script>
