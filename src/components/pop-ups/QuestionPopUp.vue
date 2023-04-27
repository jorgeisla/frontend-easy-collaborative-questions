<template>
    <q-dialog v-model="state.alert">
        <q-card style="max-width: 60%">
            <q-card-section>
                <div class="text-h3 q-pa-md">{{ props.question.pregunta }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div
                    v-for="(item, index) in props.question.opciones"
                    :key="index"
                >
                    <q-radio
                        v-model="shape"
                        size="lg"
                        :val="item.value"
                        :label="item.label"
                        class="text-h6 q-pa-md"
                    />
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    flat
                    label="OK"
                    color="primary"
                    @click="toggleDialogOff()"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { inject, ref } from 'vue';

const props = defineProps({
    alert: Boolean,
    question: Object,
});

const state = inject('state');
const shape = ref('line');
const toggleDialogOff = () => {
    console.log(state.alert);
    state.alert = false;
};
</script>
