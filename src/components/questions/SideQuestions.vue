<template>
    <div class="q-pa-md" style="width: 100%">
        <q-list bordered separator>
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Preguntas</q-toolbar-title>
                <q-btn
                    color="green"
                    label="Enviar respuestas"
                    @click="sendAnswers()"
                    id="enviar-respuestas-button"
                />
            </q-toolbar>
            <div v-for="(item, index) in discoveredQuestions" :key="index">
                <q-item
                    style="text-align: left"
                    clickable
                    v-ripple
                    @click="questionClick(item.time, item.type)"
                >
                    <q-item-section>
                        <q-item-label>{{ item.questionHeader }}</q-item-label>
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
import { useQuasar } from 'quasar';
import { formatTime } from 'src/utils';
const $q = useQuasar();

const props = defineProps<{
    discoveredQuestions: { [key: number]: Question } | null;
    questions: Question[] | null;
}>();
const answers: any = inject('answers');
const answerSent = ref(false);

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
const discoveredQuestions = ref<Question[] | null>(
    props.discoveredQuestions ? Object.values(props.discoveredQuestions) : null
);

const emit = defineEmits<{
    (e: 'question-click', val: { time: number; questionType: string }): number;
}>();

const questionClick = (time: number, questionType: string) => {
    emit('question-click', { time: time, questionType: questionType });
};

const alreadyAnswer = (question: Question) => {
    if (Object.keys(answers).includes(`${question.id}`)) {
        return true;
    }
    return false;
};

const sendAnswers = () => {
    if (answerSent.value) {
        $q.notify({
            type: 'negative',
            message: 'Las respuestas ya fueron enviadas',
            position: 'top',
        });
        return '';
    }
    if (!checkAllQuestionsAnswered()) {
        confirmIncompleteAnswersPopUpState.popUp = true;
    } else {
        confirmAnswersPopUpState.popUp = true;
    }
};

const handleAnswersSent = () => {
    answerSent.value = true;
    const enviarRespuestasButton = document.getElementById(
        'enviar-respuestas-button'
    );
    enviarRespuestasButton?.setAttribute('disabled', '');
    return;
};

const checkAllQuestionsAnswered = () => {
    const questionsNumber = props.questions ? props.questions.length : 0;
    const answersNumber = Object.keys(answers).length;
    if (questionsNumber === answersNumber) {
        return true;
    } else if (questionsNumber > answersNumber) {
        return false;
    } else {
        throw new Error('Las respuestas son mas que las preguntas');
    }
};
</script>
