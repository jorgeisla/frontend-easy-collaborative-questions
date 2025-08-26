<template>
    <div class="row">
        <div class="col-6 q-ma-xl" v-show="!$q.screen.lt.md">
            <div style="font-size: 2.5em; color: white; font-weight: 700">
                Bienvenido a Collaborative Questions
            </div>
            <div>
                <div
                    style="
                        font-size: 1.5em;
                        color: white;
                        font-weight: 700;
                        padding-top: 30px;
                    "
                >
                    ¿Qué es Collaborative Questions?
                </div>
                <div
                    style="
                        padding-top: 30px;
                        font-size: 1em;
                        color: white;
                        font-weight: 500;
                        max-width: 60ch;
                    "
                >
                    Collaborative questions es una plataforma que tiene como
                    objetivo ayudar a estudiantes a mejorar su concentración al
                    momento de visualizar grabaciones de clases online.
                </div>
                <div
                    style="
                        font-size: 1.5em;
                        color: white;
                        font-weight: 700;
                        padding-top: 60px;
                    "
                >
                    ¿Como se pretende lograr esto?
                </div>
                <div
                    style="
                        padding-top: 30px;
                        font-size: 1em;
                        color: white;
                        font-weight: 500;
                        max-width: 60ch;
                    "
                >
                    Esto se pretende lograr mediante la inclusión de preguntas
                    dentro de la reproducción del video. Es decir, al momento de
                    estar visualizando el video, de manera aleatoria se
                    mostrarán preguntas, las cuales el estudiante deberá
                    responder para poder continuar con la reproducción del
                    video. <br /><br />
                    En adición a esto, se les pedirá a los estudiantes que
                    escriban una pregunta durante la visualización del video, la
                    cual será almacenada, para que en un futuro sea mostrada a
                    otros estudiantes que estén visualizando el mismo video.
                </div>
            </div>
        </div>
        <div class="col q-ma-xl">
            <Suspense>
                <LoginComponent></LoginComponent>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

import LoginComponent from 'src/components/user/LoginComponent.vue';
</script>
