<template>
    <div class="row">
        <div class="col" style="text-align: center">
            <DefaultVideoPlayer />
        </div>
    </div>

    <div><QuestionPopUp :alert="state.alert" :question="question" /></div>
    <q-btn flat label="OK" color="primary" @click="toggleDialogOn()"></q-btn>
</template>
<script setup>
import DefaultVideoPlayer from 'src/components/video/DefaultVideoPlayer.vue';
import QuestionPopUp from 'src/components/pop-ups/QuestionPopUp.vue';
import { reactive, provide } from 'vue';

const state = reactive({
    alert: true,
});

provide('state', state);

const toggleDialogOn = () => {
    console.log(state.alert);
    state.alert = true;
};

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
};
</script>
