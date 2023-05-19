<template>
    <div class="row q-pt-xl">
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
        questioHeader: 'What is the main inspiration of this project?',
        answerOptions: [
            {
                label: 'the successfully use of Digital Life Enrichment Applications by parrots',
                value: 0,
            },
            {
                label: 'the rise of the number of parrots kept as pets',
                value: 1,
            },
            {
                label: 'the lack of cognitive stimuli and challenges given to parrots kept as pets',
                value: 2,
            },
            {
                label: 'the facility offered by modern technologies to create video games on cell phones',
                value: 3,
            },
        ],
        id: 1,
        time: 23,
    },
    {
        questioHeader:
            'What is the main task requested by the subject in this experiment?',
        answerOptions: [
            {
                label: 'to choose the largest of two values',
                value: 0,
            },
            {
                label: 'to touch the screen',
                value: 1,
            },
            {
                label: 'to have fun',
                value: 2,
            },
            {
                label: 'to select the option  they prefer',
                value: 3,
            },
        ],
        id: 2,
        time: 50,
    },
    {
        questioHeader: 'how many display modes does the application offer?',
        answerOptions: [
            {
                label: 'only one because it is a prototype',
                value: 0,
            },
            {
                label: 'two, a discreet and a continuous one',
                value: 1,
            },
            {
                label: 'four, among which two discreet and two continuous ones',
                value: 2,
            },
            {
                label: 'an infinity, even though only four are displayed',
                value: 3,
            },
        ],
        id: 3,
        time: 113,
    },
    {
        questioHeader:
            'What characterizes the "Masked Experimental Setup" described here?',
        answerOptions: [
            {
                label: 'the subject has a blindfold',
                value: 0,
            },
            {
                label: 'the experimenter has a blindfold',
                value: 1,
            },
            {
                label: 'the experimenter does not see what the subject sees',
                value: 2,
            },
            {
                label: 'the subject does not see what the experimenter sees',
                value: 3,
            },
        ],
        id: 3,
        time: 113,
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
