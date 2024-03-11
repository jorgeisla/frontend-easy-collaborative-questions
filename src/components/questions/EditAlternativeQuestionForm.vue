<template>
    <q-dialog v-model="state.alternativePopUp">
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
import { inject, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { CreatedQuestion } from 'src/models/video/pop-up';
import { editQuestion } from 'src/endpoints/questions';

const $q = useQuasar();
const props = defineProps<{
    question: CreatedQuestion;
}>();
const emit = defineEmits<{ (e: 'updated-question'): boolean }>();

const questionHeader = ref(props.question.questionHeader);
const alternativeOne = ref(props.question.answerOptions[0].label);
const alternativeTwo = ref(props.question.answerOptions[1].label);
const alternativeThree = ref(props.question.answerOptions[2].label);
const AlternativeFour = ref(props.question.answerOptions[3].label);
const minute = ref<number>(Math.floor(props.question.time / 60));
const second = ref<number>(props.question.time % 60);
const correctAlternative = ref(props.question.correctAnswer);

const determineCorrectAlternative = () => {
    if (alternativeOne.value === props.question.correctAnswer) {
        correctAlternative.value = '0';
    } else if (alternativeTwo.value === props.question.correctAnswer) {
        correctAlternative.value = '1';
    } else if (alternativeThree.value === props.question.correctAnswer) {
        correctAlternative.value = '2';
    } else if (AlternativeFour.value === props.question.correctAnswer) {
        correctAlternative.value = '3';
    }
};
determineCorrectAlternative();

const state: any = inject('state');
const endpoint = editQuestion(props.question.id);

const toggleDialogOff = () => {
    state.alternativePopUp = false;
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
            if (index === parseInt(correctAlternative.value as string)) {
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
        };

        const { data, status } = await api.patch(endpoint, payload);

        if (status === 200) {
            $q.notify({
                message: 'Pregunta editada con éxito.',
                color: 'green',
                position: 'top',
            });
            toggleDialogOff();
            emit('updated-question');
        } else {
            $q.notify({
                message: 'Error al editar pregunta.',
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
</script>
