<template>
    <div class="row">
        <div class="col" style="text-align: center">
            <DefaultVideoPlayer
                v-on:current-time-change="handleCurrentTimeChange"
            />
        </div>
    </div>

    <div>
        <QuestionPopUp
            :state="state.popUp"
            :question="question"
            :answers="answers"
        />
    </div>
</template>
<script setup lang="ts">
import DefaultVideoPlayer from 'src/components/video/DefaultVideoPlayer.vue';
import QuestionPopUp from 'src/components/pop-ups/QuestionPopUp.vue';
import { reactive, provide, ref, Ref } from 'vue';
import { Question } from 'src/models/video/pop-up';

const state = reactive({
    popUp: false,
});

const answers = reactive({});

provide('state', state);
provide('answers', answers);

const togglePopUpOn = () => {
    state.popUp = true;
};

const question: Ref<Question | null> = ref(null);
const questions = [
    {
        questioHeader:
            'Título de prueba Título de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de prueba',
        answerOptions: [
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1',
                value: 0,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 2',
                value: 1,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 3',
                value: 2,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 4',
                value: 3,
            },
        ],
        id: 1,
        time: 43,
    },
    {
        questioHeader:
            'Título de prueba Título de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de prueba',
        answerOptions: [
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1',
                value: 0,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 2',
                value: 1,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 3',
                value: 2,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 4',
                value: 3,
            },
        ],
        id: 1,
        time: 50,
    },
    {
        questioHeader:
            'Título de prueba Título de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de prueba',
        answerOptions: [
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1',
                value: 0,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 2',
                value: 1,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 3',
                value: 2,
            },
            {
                label: 'opcion 1 opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1opcion 1 4',
                value: 3,
            },
        ],
        id: 1,
        time: 30,
    },
];
const timeAsKey = () => {
    const timeAsKeyDict: { [key: number]: Question } = {};
    questions.forEach((question: Question) => {
        timeAsKeyDict[`${question.time}`] = question;
    });

    return timeAsKeyDict;
};

const getQuestionTimes = () => {
    const questionTimes = questions.map((question: Question) => {
        return question.time;
    });

    return questionTimes;
};

const questionTimes = getQuestionTimes();

const handleCurrentTimeChange = (currentTime: number) => {
    if (questionTimes.includes(currentTime)) {
        question.value = timeAsKeyDictionary[currentTime];
        togglePopUpOn();
    }
};

const timeAsKeyDictionary = timeAsKey();
</script>
