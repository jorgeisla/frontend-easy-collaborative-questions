<template>
    <q-dialog v-model="createQuestionState.popUp">
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
import axios from 'axios';
import { useQuasar } from 'quasar';
import { createQuestion } from 'src/endpoints/questions';
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';

const $q = useQuasar();
const props = defineProps<{
    videoTime: number;
}>();
const route = useRoute();

const videoIdFromUrl: number = parseInt(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);

const questionHeader = ref('');
const questionValue = ref<{ value: number; label: string }>();
const options = [
    { value: 0, label: 'Falso' },
    { value: 1, label: 'Verdadero' },
];
const minute = ref<number>(0);
const second = ref<number>(0);

const createQuestionState: any = inject('createTOFQuestionState');

const toggleDialogOff = () => {
    createQuestionState.popUp = false;
};

const onSubmit = async () => {
    try {
        const appearanceTime = minute.value * 60 + second.value;
        const true_or_false_question = { value: questionValue.value?.value };
        const payload = {
            video: videoIdFromUrl,
            header: questionHeader.value,
            appearance_time: appearanceTime,
            question_type: 'TOFQ',
            true_or_false_question: true_or_false_question,
        };

        const { data, status } = await api.post(createQuestion(), payload);

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

watch(createQuestionState, () => {
    minute.value = Math.floor(props.videoTime / 60);
    second.value = props.videoTime % 60;
});
</script>
