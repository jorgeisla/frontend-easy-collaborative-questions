<template>
    <q-page class="about-page">
        <!-- Hero Section -->
        <div class="hero-section">
            <div class="hero-content">
                <q-card class="hero-card" flat>
                    <div class="text-center q-pa-xl">
                        <q-icon
                            name="quiz"
                            size="80px"
                            color="primary"
                            class="q-mb-md"
                        />
                        <h1 class="hero-title text-primary">
                            Preguntas colaborativas: aprende preguntando
                        </h1>
                        <p class="hero-subtitle text-grey-7">
                            Transformando la educación a través de la
                            colaboración y el aprendizaje activo
                        </p>
                    </div>
                </q-card>
            </div>
        </div>

        <!-- Main Content -->
        <div class="content-section q-pa-xl">
            <div class="row q-col-gutter-xl">
                <!-- Mission Statement -->
                <div class="col-12 col-md-6">
                    <q-card class="content-card" flat>
                        <q-card-section class="q-pa-lg">
                            <div class="text-h5 text-primary q-mb-md">
                                <q-icon
                                    name="flag"
                                    color="primary"
                                    class="q-mr-sm"
                                />
                                Nuestra Misión
                            </div>
                            <p class="text-body1 text-grey-8 q-mb-md">
                                La plataforma "Collaborative Questions"
                                transforma la experiencia pasiva de visualizar
                                videos educativos en una actividad de
                                aprendizaje activo y colaborativo.
                            </p>
                            <p class="text-body1 text-grey-8">
                                Su objetivo principal es reducir los costos de
                                implementación de la metodología "flipped
                                classroom" con preguntas interactivas, delegando
                                la creación de preguntas a los propios
                                estudiantes mientras visualizan el contenido.
                            </p>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- How It Works -->
                <div class="col-12 col-md-6">
                    <q-card class="content-card" flat>
                        <q-card-section class="q-pa-lg">
                            <div class="text-h5 text-primary q-mb-md">
                                <q-icon
                                    name="play_circle"
                                    color="primary"
                                    class="q-mr-sm"
                                />
                                Cómo Funciona
                            </div>
                            <p class="text-body1 text-grey-8 q-mb-md">
                                La plataforma permite a los estudiantes crear
                                preguntas en tiempo real durante la reproducción
                                de videos educativos, generando un banco
                                colaborativo de preguntas que beneficia a toda
                                la comunidad de aprendizaje.
                            </p>
                            <p class="text-body1 text-grey-8">
                                Mediante preguntas tipo "pop-up" que aparecen
                                estratégicamente durante la visualización, busca
                                mantener la atención activa de los estudiantes y
                                promover la reflexión sobre el contenido.
                            </p>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- Benefits -->
                <div class="col-12">
                    <q-card class="content-card" flat>
                        <q-card-section class="q-pa-lg">
                            <div
                                class="text-h5 text-primary q-mb-lg text-center"
                            >
                                <q-icon
                                    name="psychology"
                                    color="primary"
                                    class="q-mr-sm"
                                />
                                Beneficios del Aprendizaje Colaborativo
                            </div>

                            <div class="row q-col-gutter-lg">
                                <div class="col-12 col-md-4">
                                    <div
                                        class="benefit-item text-center q-pa-md"
                                    >
                                        <q-icon
                                            name="lightbulb"
                                            size="60px"
                                            color="secondary"
                                            class="q-mb-md"
                                        />
                                        <h6
                                            class="text-h6 text-secondary q-mb-sm"
                                        >
                                            Desarrollo Metacognitivo
                                        </h6>
                                        <p class="text-body2 text-grey-7">
                                            Los estudiantes desarrollan
                                            habilidades metacognitivas al
                                            formular preguntas significativas
                                            sobre el material.
                                        </p>
                                    </div>
                                </div>

                                <div class="col-12 col-md-4">
                                    <div
                                        class="benefit-item text-center q-pa-md"
                                    >
                                        <q-icon
                                            name="analytics"
                                            size="60px"
                                            color="secondary"
                                            class="q-mb-md"
                                        />
                                        <h6
                                            class="text-h6 text-secondary q-mb-sm"
                                        >
                                            Análisis y Síntesis
                                        </h6>
                                        <p class="text-body2 text-grey-7">
                                            Se obliga a los estudiantes a
                                            analizar y sintetizar la información
                                            presentada.
                                        </p>
                                    </div>
                                </div>

                                <div class="col-12 col-md-4">
                                    <div
                                        class="benefit-item text-center q-pa-md"
                                    >
                                        <q-icon
                                            name="group"
                                            size="60px"
                                            color="secondary"
                                            class="q-mb-md"
                                        />
                                        <h6
                                            class="text-h6 text-secondary q-mb-sm"
                                        >
                                            Perspectivas Múltiples
                                        </h6>
                                        <p class="text-body2 text-grey-7">
                                            Al responder preguntas de sus
                                            compañeros, se exponen a diferentes
                                            perspectivas sobre el mismo
                                            contenido.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
// Component name for ESLint compliance
defineOptions({
    name: 'AboutPage',
});
</script>

<style scoped>
.about-page {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

.hero-section {
    background: linear-gradient(135deg, #1976d2 0%, #26a69a 100%);
    padding: 80px 20px;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
}

.hero-card {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.2rem;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
}

.content-section {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 60px;
}

.content-card {
    background: white !important;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    height: 100%;
}

.content-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.benefit-item {
    transition: transform 0.3s ease;
}

.benefit-item:hover {
    transform: translateY(-5px);
}

.cta-card {
    background: linear-gradient(135deg, #1976d2 0%, #26a69a 100%) !important;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(25, 118, 210, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .hero-section {
        padding: 60px 20px;
    }

    .content-section {
        padding: 40px 20px;
    }

    .benefit-item {
        margin-bottom: 2rem;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 1.8rem;
    }

    .hero-section {
        padding: 40px 20px;
    }
}
</style>
