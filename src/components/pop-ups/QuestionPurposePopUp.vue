<template>
    <q-dialog v-model="popUpState.popUp" persistent>
        <q-card>
            <q-card-section>
                <div class="text-h6">Importante !!</div>
            </q-card-section>
            <q-card-section class="row items-center">
                <span class="q-ml-sm text-body1"
                    >Dentro del reproductor del video encontrarás un botón para
                    realizar preguntas. Estas deben estar dirigidas a tus
                    compañeros, ya que estas les apareceran de forma aleatoria
                    mientras vean esta clase. Estas deben poder ser respondidas
                    con el contenido que se verá en el video.</span
                >
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    flat
                    label="No volver a mostrar"
                    color="primary"
                    @click="dontShowAgain"
                    v-close-popup
                />
                <q-btn flat label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { userStore } from 'src/stores/user-store';

const popUpState: { popUp: boolean } = inject('proposalPopUp') as {
    popUp: boolean;
};

const dontShowAgain = () => {
    const store = userStore();
    store.setReminderPopUp(false);
    popUpState.popUp = false;
};
</script>
