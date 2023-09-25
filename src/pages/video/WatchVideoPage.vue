<template>
    <div class="row q-pt-xl">
        <div class="col-md-8 col-xs-12" style="text-align: center">
            <DefaultVideoPlayer
                v-on:current-time-change="handleCurrentTimeChange"
                :url="videoUrl"
                v-on:create-alternative-question="
                    handleAlternativeQuestionFormActivation
                "
                v-on:create-t-o-f-question="handleTOFQuestionFormActivation"
                v-on:create-essay-question="handleEssayQuestionFormActivation"
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
    <!-- <div class="row q-pt-xl">
        <div class="col-md-12 col-xs-12" style="text-align: center">
            <AnswersChecker :questions="questions" />
        </div>
    </div> -->
    <div>
        <QuestionPopUp :question="question" :key="popUpComponentKey" />
    </div>
    <div>
        <CreateAlternativeQuestionForm
            :videoTime="videoTime"
        ></CreateAlternativeQuestionForm>
    </div>
    <div>
        <CreateTrueorFalseQuestionForm
            :videoTime="videoTime"
        ></CreateTrueorFalseQuestionForm>
    </div>
    <div>
        <CreateEssayQuestionForm
            :videoTime="videoTime"
        ></CreateEssayQuestionForm>
    </div>
</template>
<script setup lang="ts">
import DefaultVideoPlayer from 'src/components/video/DefaultVideoPlayer.vue';
import QuestionPopUp from 'src/components/pop-ups/QuestionPopUp.vue';
import SideQuestions from 'src/components/questions/SideQuestions.vue';
// import AnswersChecker from 'src/components/answers/AnswersChecker.vue';
import CreateAlternativeQuestionForm from 'src/components/questions/CreateAlternativeQuestionForm.vue';
import CreateTrueorFalseQuestionForm from 'src/components/questions/CreateTrueorFalseQuestionForm.vue';
import { reactive, provide, ref, Ref } from 'vue';
import { Question } from 'src/models/video/pop-up';
import { readJsonFile } from 'src/utils';
import axios from 'axios';
import { retrieveDownloadLink } from 'src/endpoints/video';
import { useQuasar } from 'quasar';
import { cloudfront } from 'src/utils/env-var';
import CreateEssayQuestionForm from 'src/components/questions/CreateEssayQuestionForm.vue';

const $q = useQuasar();

const videoUrl = ref();
const state = reactive({
    popUp: false,
});
const videoTime = ref(0);

const createAlternativeQuestionState = reactive({ popUp: false });
const createTOFQuestionState = reactive({ popUp: false });
const createEssayQuestionState = reactive({ popUp: false });

const props = defineProps<{
    id: string;
}>();

const answers = reactive({});

const sideQuestionsComponentKey = ref(0);
const popUpComponentKey = ref(0);

provide('state', state);
provide('answers', answers);
provide('createAlternativeQuestionState', createAlternativeQuestionState);
provide('createTOFQuestionState', createTOFQuestionState);
provide('createEssayQuestionState', createEssayQuestionState);

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
    videoTime.value = currentTime;
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

const handleAlternativeQuestionFormActivation = (time: number) => {
    videoTime.value = time;
    createAlternativeQuestionState.popUp = true;
};

const handleTOFQuestionFormActivation = (time: number) => {
    videoTime.value = time;
    createTOFQuestionState.popUp = true;
};

const handleEssayQuestionFormActivation = (time: number) => {
    videoTime.value = time;
    createEssayQuestionState.popUp = true;
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
