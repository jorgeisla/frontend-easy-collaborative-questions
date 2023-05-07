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
    <q-btn label="OK" color="primary" @click="togglePopUpOn()"></q-btn>
</template>
<script setup lang="ts">
import DefaultVideoPlayer from 'src/components/video/DefaultVideoPlayer.vue';
import QuestionPopUp from 'src/components/pop-ups/QuestionPopUp.vue';
import { reactive, provide } from 'vue';

const state = reactive({
    popUp: true,
});

const answers = reactive({});

provide('state', state);
provide('answers', answers);

const togglePopUpOn = () => {
    state.popUp = true;
};

const questions = { 43: 1 };

const questionsTimes = Object.keys(questions).map((time) => {
    return parseInt(time);
});

const question = {
    pregunta:
        'Título de prueba Título de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de pruebaTítulo de prueba',
    opciones: [
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
};

const handleCurrentTimeChange = (currentTime: number) => {
    if (questionsTimes.includes(currentTime)) {
        togglePopUpOn();
    }
};
</script>
