<template>
    <q-dialog v-model="createAlternativeQuestionState.popUp">
        <q-card style="text-align: left; max-width: 1080px">
            <q-card-section>
                <div class="text-h4 q-pa-md">Escribe tu pregunta</div>
            </q-card-section>
            <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md q-ma-md">
                    <q-input
                        filled
                        v-model="questionHeader"
                        label="Pregunta"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'Escribe el encabezado de la pregunta',
                        ]"
                    />
                    <q-input
                        filled
                        v-model="alternativeOne"
                        label="Alternativa 1"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'No puedes dejar vacia ninguna alternativa',
                        ]"
                    />

                    <q-input
                        filled
                        v-model="alternativeTwo"
                        label="Alternativa 2"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'No puedes dejar vacia ninguna alternativa',
                        ]"
                    />
                    <q-input
                        filled
                        v-model="alternativeThree"
                        label="Alternativa 3"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'No puedes dejar vacia ninguna alternativa',
                        ]"
                    />
                    <q-input
                        filled
                        v-model="AlternativeFour"
                        label="Alternativa 4"
                        lazy-rules
                        :rules="[
                            (val) =>
                                (val && val.length > 0) ||
                                'No puedes dejar vacia ninguna alternativa',
                        ]"
                    />
                    <q-separator />

                    <div>
                        <div class="q-gutter-sm">
                            <div class="text-h6">
                                ¿Cual es la alternativa correcta?
                            </div>
                            <q-radio
                                v-model="correctAlternative"
                                checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye"
                                val="0"
                                label="Alternativa 1"
                            />
                            <q-radio
                                v-model="correctAlternative"
                                checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye"
                                val="1"
                                label="Alternativa 2"
                            />
                            <q-radio
                                v-model="correctAlternative"
                                checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye"
                                val="2"
                                label="Alternativa 3"
                            />
                            <q-radio
                                v-model="correctAlternative"
                                checked-icon="task_alt"
                                unchecked-icon="panorama_fish_eye"
                                val="3"
                                label="Alternativa 4"
                            />
                        </div>
                    </div>
                    <q-separator />

                    <div class="text-h6">
                        ¿En que momento debiese aparecer esta pregunta?
                    </div>
                    <div class="q-gutter-md row items-start">
                        <q-input
                            label="Minuto"
                            v-model.number="minute"
                            type="number"
                            filled
                            style="max-width: 200px"
                            :rules="[
                                (val) =>
                                    val ||
                                    val === 0 ||
                                    'Debes inducar un minuto',
                            ]"
                        />
                        <q-input
                            label="Segundo"
                            v-model.number="second"
                            type="number"
                            filled
                            style="max-width: 200px"
                            :rules="[
                                (val) =>
                                    val ||
                                    val === 0 ||
                                    'Debes inducar un segundo',
                            ]"
                        />
                    </div>
                    <div>
                        <q-btn
                            label="Enviar pregunta"
                            type="submit"
                            color="primary"
                        />
                        <q-btn
                            @click="toggleDialogOff"
                            label="Cerrar"
                            color="primary"
                            flat
                            class="q-ml-sm"
                        />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { createQuestion } from 'src/endpoints/questions';
import { useRoute } from 'vue-router';

const $q = useQuasar();
const props = defineProps<{
    videoTime: number;
}>();

const questionHeader = ref('');
const alternativeOne = ref('');
const alternativeTwo = ref('');
const alternativeThree = ref('');
const AlternativeFour = ref('');
const minute = ref<number>(0);
const second = ref<number>(0);
const correctAlternative = ref();

const route = useRoute();
const videoIdFromUrl: number = parseInt(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);
const createAlternativeQuestionState: any = inject(
    'createAlternativeQuestionState'
);

const toggleDialogOff = () => {
    createAlternativeQuestionState.popUp = false;
};

const onSubmit = async () => {
    try {
        const appearanceTime = minute.value * 60 + second.value;
        const alternative_question_option: any[] = [];
        const alternative_question = {
            alternative_question_option: alternative_question_option,
        };
        const alternatives = [
            alternativeOne.value,
            alternativeTwo.value,
            alternativeThree.value,
            AlternativeFour.value,
        ];
        let index = 0;
        for (const alternative of alternatives) {
            if (index === parseInt(correctAlternative.value)) {
                alternative_question.alternative_question_option.push({
                    sentence: alternative,
                    correct_answer: true,
                });
            } else {
                alternative_question.alternative_question_option.push({
                    sentence: alternative,
                    correct_answer: false,
                });
            }
            index += 1;
        }
        const payload = {
            alternative_question: alternative_question,
            header: questionHeader.value,
            appearance_time: appearanceTime,
            question_type: 'AQ',
            video: videoIdFromUrl,
        };

        const { data, status } = await axios.post(createQuestion(), payload);

        if (status === 201) {
            $q.notify({
                message: 'Pregunta creada con éxito.',
                color: 'green',
                position: 'top',
            });
            toggleDialogOff();
        } else {
            $q.notify({
                message: 'Error al crear pregunta.',
                color: 'red',
                position: 'top',
            });
        }
    } catch (e) {
        $q.notify({
            message: 'Ha ocurrido un error en la comunicacion con el servidor.',
            color: 'red',
            position: 'top',
        });
        console.log(e);
    }
};

watch(createAlternativeQuestionState, () => {
    minute.value = Math.floor(props.videoTime / 60);
    second.value = props.videoTime % 60;
});
</script>
