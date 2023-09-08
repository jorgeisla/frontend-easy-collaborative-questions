<template>
    <div class="row q-pt-xl">
        <div class="col-md-8 col-xs-12" style="text-align: center">
            <DefaultVideoPlayer
                v-on:current-time-change="handleCurrentTimeChange"
                :url="videoUrl"
            />
        </div>
        <div class="col-md-4 col-xs-12" style="text-align: center">
            <SideQuestions
                v-on:question-click="handleQuestionClick"
                :discovered-questions="discoverQuestions"
                :questions="questions"
                :key="sideQuestionsComponentKey"
            />
        </div>
    </div>
    <div class="row q-pt-xl">
        <div class="col-md-12 col-xs-12" style="text-align: center">
            <AnswersChecker :questions="questions" />
        </div>
    </div>
    <div>
        <QuestionPopUp
            :state="state.popUp"
            :question="question"
            :answers="answers"
            :key="popUpComponentKey"
        />
    </div>
</template>
<script setup lang="ts">
import DefaultVideoPlayer from 'src/components/video/DefaultVideoPlayer.vue';
import QuestionPopUp from 'src/components/pop-ups/QuestionPopUp.vue';
import SideQuestions from 'src/components/questions/SideQuestions.vue';
import AnswersChecker from 'src/components/answers/AnswersChecker.vue';
import { reactive, provide, ref, Ref } from 'vue';
import { Question } from 'src/models/video/pop-up';
import { readJsonFile } from 'src/utils';
import axios from 'axios';
import { retrieveDownloadLink } from 'src/endpoints/video';
import { useQuasar } from 'quasar';
import { cloudfront } from 'src/utils/env-var';

const $q = useQuasar();

const videoUrl = ref();
const state = reactive({
    popUp: false,
});

const props = defineProps<{
    id: number;
}>();

const answers = reactive({});

const sideQuestionsComponentKey = ref(0);
const popUpComponentKey = ref(0);

provide('state', state);
provide('answers', answers);

const togglePopUpOn = () => {
    popUpComponentKey.value += 1;
    state.popUp = true;
};

const questions = JSON.parse(await readJsonFile('questions.json'));
const discoverQuestions: Question[] = [];

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
        const questionFromTimeDictionary = timeAsKeyDictionary[currentTime];
        question.value = questionFromTimeDictionary;
        discoverQuestions.push(questionFromTimeDictionary);
        sideQuestionsComponentKey.value += 1;
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

const retrieveVideoLink = async () => {
    try {
        const { data, status } = await axios.get(
            retrieveDownloadLink(props.id)
        );
        if (status !== 200) {
            $q.notify({
                message: 'Error en la conexión con el servidor.',
                color: 'red',
            });
        }
        console.log(cloudfront);
        videoUrl.value = `${cloudfront}/${data.file_name}`;
    } catch (e) {
        $q.notify({
            message: 'Error al descargar video',
            color: 'red',
        });
    }
};

await retrieveVideoLink();
</script>
