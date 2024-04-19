<template>
    <q-dialog v-model="state.tofPopUp">
        <q-card style="text-align: left; max-width: 1080px">
            <q-card-section>
                <div class="text-h4 q-pa-md">Escribe tu pregunta</div>
            </q-card-section>
            <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md q-ma-md">
                    <q-input
                        autogrow
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
                    <q-separator />

                    <div>
                        <div class="q-gutter-sm">
                            <div class="text-h6">
                                ¿Esta pregunta es verdadera o falsa?
                            </div>
                            <q-select
                                v-model="questionValue"
                                :options="options"
                                label="Verdadero o falso?"
                            ></q-select>
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
const minute = ref<number>(Math.floor(props.question.time / 60));
const second = ref<number>(props.question.time % 60);
const questionValue = ref<{ value: number; label: string }>();
const options = [
    { value: 0, label: 'Falso' },
    { value: 1, label: 'Verdadero' },
];
const state: any = inject('state');
const endpoint = editQuestion(props.question.id);

const defineQuestionValue = () => {
    if (props.question.correctAnswer == 0) {
        questionValue.value = options[0];
    } else {
        questionValue.value = options[1];
    }
};
defineQuestionValue();

const toggleDialogOff = () => {
    state.tofPopUp = false;
};

const onSubmit = async () => {
    try {
        const appearanceTime = minute.value * 60 + second.value;
        const payload = {
            header: questionHeader.value,
            appearance_time: appearanceTime,
            value: questionValue.value,
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
