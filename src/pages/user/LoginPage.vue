<template>
    <div
        style="
            height: 100vh;
            display: flex;
            background-image: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.85),
                    rgba(0, 0, 0, 0.95)
                ),
                url('collaboration_students.png');
            background-repeat: no-repeat;
            background-size: cover;
        "
    >
        <div style="width: 60%; padding: 3%; padding-left: 5%">
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
        <div
            style="
                height: 100%;
                width: 40%;
                padding-top: 20vh;
                padding-right: 5%;
                padding-left: 10%;
            "
        >
            <LoginComponent></LoginComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginComponent from 'src/components/user/LoginComponent.vue';
</script>
