<template>
    <div
        class="row q-pt-md"
        style="
            background-image: linear-gradient(
                    rgba(0, 0, 0, 0.85),
                    rgba(0, 0, 0, 0.85)
                ),
                url('collaboration_background.png');
            background-repeat: no-repeat;
            background-size: cover;
            height: 100vh;
        "
    >
        <div class="col-md-8 col-xs-12" style="text-align: center">
            <div style="text-align: left" class="q-ma-md">
                <q-btn @click="goBack()" class="text-white" color="primary"
                    >Volver</q-btn
                >
            </div>
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
        <div class="row">
            <div class="col-md-12 col-xs-12" style="text-align: center">
                <CreatedQuestions :key="createdQuestionsComponentKey" />
            </div>
        </div>
    </div>
    <div>
        <QuestionPopUp :question="question" :key="popUpComponentKey" />
    </div>
    <div>
        <EssayQuestionPopUp
            :question="question"
            :key="popUpComponentKey"
        ></EssayQuestionPopUp>
    </div>
    <div>
        <TOFQuestionPopUp
            :question="question"
            :key="popUpComponentKey"
        ></TOFQuestionPopUp>
    </div>
    <div>
        <CreateAlternativeQuestionForm
            :videoTime="videoTime"
            @created-question="createdQuestionEvent"
        ></CreateAlternativeQuestionForm>
    </div>
    <div>
        <CreateTrueOrFalseQuestionForm
            :videoTime="videoTime"
            @created-question="createdQuestionEvent"
        ></CreateTrueOrFalseQuestionForm>
    </div>
    <div>
        <CreateEssayQuestionForm
            :videoTime="videoTime"
            @created-question="createdQuestionEvent"
        ></CreateEssayQuestionForm>
    </div>
    <div v-if="store.getReminderPopUp">
        <QuestionPurposePopUp></QuestionPurposePopUp>
    </div>
</template>
<script setup lang="ts">
import DefaultVideoPlayer from 'src/components/video/DefaultVideoPlayer.vue';
import QuestionPopUp from 'src/components/pop-ups/QuestionPopUp.vue';
import EssayQuestionPopUp from 'src/components/pop-ups/EssayQuestionPopUp.vue';
import SideQuestions from 'src/components/questions/SideQuestions.vue';
import TOFQuestionPopUp from 'src/components/pop-ups/TOFQuestionPopUp.vue';
import CreateAlternativeQuestionForm from 'src/components/questions/CreateAlternativeQuestionForm.vue';
import CreateTrueOrFalseQuestionForm from 'src/components/questions/CreateTrueOrFalseQuestionForm.vue';
import CreatedQuestions from 'src/components/questions/CreatedQuestions.vue';
import { reactive, provide, ref, Ref, onBeforeUnmount } from 'vue';
import { Question } from 'src/models/video/pop-up';
import { retrieveDownloadLink } from 'src/endpoints/video';
import { useQuasar } from 'quasar';
import { cloudfront } from 'src/utils/env-var';
import CreateEssayQuestionForm from 'src/components/questions/CreateEssayQuestionForm.vue';
import { listQuestionsFromVideo } from 'src/endpoints/questions';
import QuestionPurposePopUp from 'src/components/pop-ups/QuestionPurposePopUp.vue';
import { api } from 'src/boot/axios';
import { userStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const store = userStore();
const router = useRouter();

const goBack = () => {
    router.go(-1);
};
const videoUrl = ref();
const createdOneQuestion = ref<boolean>(false);
const state = reactive({
    essayPopUp: false,
    tofPopUp: false,
    alternativePopUp: false,
});

const videoTime = ref(0);

const createAlternativeQuestionState = reactive({ popUp: false });
const createTOFQuestionState = reactive({ popUp: false });
const createEssayQuestionState = reactive({ popUp: false });
const proposalPopUpState = reactive({ popUp: true });

const props = defineProps<{
    id: string;
}>();

const answers = reactive({});

const sideQuestionsComponentKey = ref(0);
const createdQuestionsComponentKey = ref(0);
const popUpComponentKey = ref(0);
const timeAsKeyDictionary = ref<{ [key: number]: Question }>({});
const questionTimes = ref<number[]>([]);

provide('state', state);
provide('answers', answers);
provide('createAlternativeQuestionState', createAlternativeQuestionState);
provide('createTOFQuestionState', createTOFQuestionState);
provide('createEssayQuestionState', createEssayQuestionState);
provide('proposalPopUp', proposalPopUpState);

// Start the timer when the component is mounted
const timerInterval = setInterval(() => {
    if (!createdOneQuestion.value) {
        $q.notify({
            message:
                'Recuerda que debes realizar al menos una pregunta en este video.',
            color: 'accent',
            position: 'top',
            timeout: 5000,
        });
    }
}, 180000); // 180 seconds (180,000 milliseconds)

// Clear the timer when the component is destroyed to prevent memory leaks
onBeforeUnmount(() => {
    clearInterval(timerInterval);
});

const togglePopUpOn = () => {
    popUpComponentKey.value += 1;
    state.alternativePopUp = true;
};

const toggleEssayQuestionPopUpOn = () => {
    popUpComponentKey.value += 1;
    state.essayPopUp = true;
};

const toggleToFQuestionPopUpOn = () => {
    popUpComponentKey.value += 1;
    state.tofPopUp = true;
};

const questions = ref<Question[]>([]);
const discoverQuestions = ref<{ [key: string]: Question }>({});

const question: Ref<Question | null> = ref(null);

const timeAsKey = () => {
    questions.value.forEach((question: Question) => {
        timeAsKeyDictionary.value[`${question.time}`] = question;
    });
};

const getQuestionTimes = () => {
    questionTimes.value = questions.value.map((question: Question) => {
        return question.time;
    });
};

const handleCurrentTimeChange = (currentTime: number) => {
    videoTime.value = currentTime;
    if (questionTimes.value.includes(currentTime)) {
        const questionFromTimeDictionary =
            timeAsKeyDictionary.value[currentTime];
        if (questionFromTimeDictionary.type === 'AQ') {
            question.value = questionFromTimeDictionary;
            discoverQuestions.value[`${questionFromTimeDictionary.id}`] =
                questionFromTimeDictionary;
            sideQuestionsComponentKey.value += 1;
            togglePopUpOn();
        } else if (questionFromTimeDictionary.type === 'EQ') {
            question.value = questionFromTimeDictionary;
            discoverQuestions.value[`${questionFromTimeDictionary.id}`] =
                questionFromTimeDictionary;
            sideQuestionsComponentKey.value += 1;
            toggleEssayQuestionPopUpOn();
        } else if (questionFromTimeDictionary.type === 'TOFQ') {
            question.value = questionFromTimeDictionary;
            discoverQuestions.value[`${questionFromTimeDictionary.id}`] =
                questionFromTimeDictionary;
            sideQuestionsComponentKey.value += 1;
            toggleToFQuestionPopUpOn();
        }
    }
};

const handleQuestionClick = (values: {
    time: number;
    questionType: string;
}) => {
    if (questionTimes.value.includes(values.time)) {
        question.value = timeAsKeyDictionary.value[values.time];
        if (values.questionType === 'AQ') {
            togglePopUpOn();
        } else if (values.questionType === 'EQ') {
            toggleEssayQuestionPopUpOn();
        } else if (values.questionType === 'TOFQ') {
            toggleToFQuestionPopUpOn();
        }
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

const retrieveVideoLink = async () => {
    try {
        const { data, status } = await api.get(retrieveDownloadLink(props.id));
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

const listQuestions = async () => {
    try {
        const { data, status } = await api.get(
            listQuestionsFromVideo(props.id)
        );
        if (status !== 200) {
            $q.notify({
                message: 'Error en la conexión con el servidor.',
                color: 'red',
            });
        }
        questions.value = data.map((item: any) => {
            if (item.question_type === 'AQ') {
                const answerOptions =
                    item.alternative_question.alternative_question_option.map(
                        (alternativeOption: any) => {
                            return {
                                label: alternativeOption.sentence,
                                value: alternativeOption.id,
                            };
                        }
                    );
                return {
                    questionHeader: item.header,
                    answerOptions: answerOptions,
                    id: item.id,
                    time: item.appearance_time,
                    type: item.question_type,
                };
            } else if (item.question_type === 'TOFQ') {
                const answerOptions = [
                    { label: 'Verdadero', value: 1 },
                    { label: 'Falso', value: 0 },
                ];
                return {
                    questionHeader: item.header,
                    answerOptions: answerOptions,
                    id: item.id,
                    time: item.appearance_time,
                    type: item.question_type,
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
        timeAsKey();
        getQuestionTimes();
    } catch (e) {
        $q.notify({
            message: 'Error al descargar video',
            color: 'red',
        });
    }
};

setTimeout(() => {
    $q.notify({
        message:
            'Recuerda que debes realizar al menos una pregunta en este video.',
        color: 'accent',
        position: 'top',
        timeout: 5000,
    });
}, 10000); // 10 seconds (10,000 milliseconds)

const createdQuestionEvent = () => {
    createdQuestionsComponentKey.value += 1;
    createdOneQuestion.value = true;
};

await Promise.allSettled([listQuestions(), retrieveVideoLink()]);
</script>
