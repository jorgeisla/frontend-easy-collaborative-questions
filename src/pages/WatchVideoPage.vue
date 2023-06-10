<template>
    <div class="row q-pt-xl">
        <div class="col-md-8 col-xs-12" style="text-align: center">
            <DefaultVideoPlayer
                v-on:current-time-change="handleCurrentTimeChange"
            />
        </div>
        <div class="col-md-4 col-xs-12" style="text-align: center">
            <SideQuestions
                v-on:question-click="handleQuestionClick"
                :questions="questions"
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
import SideQuestions from 'src/components/questions/SideQuestions.vue';
import { reactive, provide, ref, Ref } from 'vue';
import { Question } from 'src/models/video/pop-up';
import { readJsonFile } from 'src/utils';

const state = reactive({
    popUp: false,
});

const answers = reactive({});

provide('state', state);
provide('answers', answers);

const togglePopUpOn = () => {
    state.popUp = true;
};

const questions = JSON.parse(await readJsonFile('questions.json'));

const question: Ref<Question | null> = ref(null);

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

const handleQuestionClick = (time: number) => {
    if (questionTimes.includes(time)) {
        question.value = timeAsKeyDictionary[time];
        togglePopUpOn();
    }
};

const timeAsKeyDictionary = timeAsKey();
</script>
