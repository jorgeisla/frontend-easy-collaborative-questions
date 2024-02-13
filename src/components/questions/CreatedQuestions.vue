<template>
    <div class="q-px-md" style="width: 100%">
        <q-list bordered separator class="bg-primary">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Preguntas creadas</q-toolbar-title>
            </q-toolbar>
            <div v-for="(item, index) in questions" :key="index">
                <q-item
                    ><q-item-section class="text-white"
                        >{{ item.questionHeader }} -
                        {{ formatTime(item.time) }}</q-item-section
                    >
                    <q-btn
                        class="q-ml-md bg-yellow-10 text-white"
                        @click="activateEditQuestionsPopUp(item, item.type)"
                    >
                        Editar
                    </q-btn>
                    <q-btn
                        class="q-ml-md bg-red text-white"
                        @click="deleteQuestion(item.id)"
                    >
                        Eliminar
                    </q-btn>
                </q-item>
                <q-separator />
            </div>
        </q-list>
        <div v-if="createdQuestionItem">
            <EditAlternativeQuestionForm
                v-if="state.alternativePopUp"
                :key="createdQuestionItem.id"
                :question="createdQuestionItem"
            ></EditAlternativeQuestionForm>
            <EditTrueOrFalseQuestionForm
                v-if="state.tofPopUp"
                :key="createdQuestionItem.id"
                :question="createdQuestionItem"
            ></EditTrueOrFalseQuestionForm>
            <EditEssayQuestionForm
                v-if="state.essayPopUp"
                :key="createdQuestionItem.id"
                :question="createdQuestionItem"
            ></EditEssayQuestionForm>
        </div>
    </div>
</template>
<script lang="ts" setup>
import EditAlternativeQuestionForm from './EditAlternativeQuestionForm.vue';
import EditTrueOrFalseQuestionForm from './EditTrueOrFalseQuestionForm.vue';
import EditEssayQuestionForm from './EditEssayQuestionForm.vue';
import { formatTime } from 'src/utils';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import {
    listQuestionsCreatedByUserNoMoreThanCertainTimeAgo,
    editQuestion,
} from 'src/endpoints/questions';
import { CreatedQuestion } from 'src/models/video/pop-up';
import { ref, provide, reactive } from 'vue';
const $q = useQuasar();
const questions = ref<CreatedQuestion[]>([]);
const state = reactive({
    essayPopUp: false,
    tofPopUp: false,
    alternativePopUp: false,
});
provide('state', state);
const createdQuestionItem = ref<CreatedQuestion>();

const activateEditQuestionsPopUp = (item: CreatedQuestion, flag: string) => {
    createdQuestionItem.value = item;
    state.alternativePopUp = false;
    state.essayPopUp = false;
    state.tofPopUp = false;
    if (flag === 'TOFQ') {
        state.tofPopUp = true;
    } else if (flag === 'EQ') {
        state.essayPopUp = true;
    } else if (flag === 'AQ') {
        state.alternativePopUp = true;
    }
};

const listQuestions = async () => {
    try {
        const { data, status } = await api.get(
            listQuestionsCreatedByUserNoMoreThanCertainTimeAgo()
        );
        if (status !== 200) {
            $q.notify({
                message: 'Error en la conexión con el servidor.',
                color: 'red',
            });
        }
        questions.value = data.map((item: any) => {
            let correctAnswer: any = null;
            if (item.question_type === 'AQ') {
                const answerOptions =
                    item.alternative_question.alternative_question_option.map(
                        (alternativeOption: any) => {
                            if (alternativeOption.correct_answer) {
                                correctAnswer = alternativeOption.sentence;
                            }
                            return {
                                label: alternativeOption.sentence,
                                value: alternativeOption.id,
                            };
                        }
                    );
                return {
                    questionHeader: item.header,
                    answerOptions: answerOptions,
                    correctAnswer: correctAnswer,
                    id: item.id,
                    time: item.appearance_time,
                    type: item.question_type,
                };
            } else if (item.question_type === 'TOFQ') {
                if (item.true_or_false_question.value) {
                    correctAnswer = 1;
                } else {
                    correctAnswer = 0;
                }
                return {
                    questionHeader: item.header,
                    id: item.id,
                    time: item.appearance_time,
                    type: item.question_type,
                    correctAnswer: correctAnswer,
                };
            } else if (item.question_type === 'EQ') {
                return {
                    questionHeader: item.header,
                    id: item.id,
                    time: item.appearance_time,
                    type: item.question_type,
                };
            }
        });
    } catch (e) {
        $q.notify({
            message: 'Error al traer preguntas creadas',
            color: 'red',
        });
    }
};

const deleteQuestion = async (questionId: number) => {
    try {
        const { data, status } = await api.delete(editQuestion(questionId));
        if (status !== 204) {
            $q.notify({
                message: 'Error en la conexión con el servidor.',
                color: 'red',
            });
        }
    } catch (e) {
        $q.notify({
            message: 'Error al eliminar pregunta',
            color: 'red',
        });
    }
};
await Promise.allSettled([listQuestions()]);
</script>
