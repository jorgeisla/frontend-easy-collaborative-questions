<template>
    <div
        class="video-player-container"
        @mouseenter="mouseEnterVideoPlayer"
        @mousemove="toggleVideoControlsOnForTwoSeconds"
        @mouseleave="toggleVideoControlsOffInstantly"
        @fullscreenchange="handleChangeFullScreen"
        ref="videoPlayerContainer"
    >
        <video
            class="video-player"
            ref="videoPlayer"
            @click="togglePlay"
        ></video>
        <div
            class="video-controls"
            :class="{ hidden: !showControls }"
            id="video-controls"
        >
            <input
                class="progress-bar"
                type="range"
                min="0"
                :max="duration"
                :value="currentTime"
                @input="seekVideo"
            />
            <div class="button-container">
                <div class="button-container-left">
                    <button @click="togglePlay">
                        <div v-if="videoIsPlayed">
                            <i class="fa-solid fa-pause"></i>
                        </div>
                        <div v-else-if="!videoIsPlayed">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </button>

                    <div class="time">
                        {{ currentTimeStr }} / {{ durationStr }}
                    </div>
                    <input
                        class="volume-input"
                        style="margin-left: 5%"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        v-model="volume"
                    />
                </div>
                <div class="button-container-right">
                    <div style="padding-right: 3%">
                        <q-btn
                            color="primary"
                            icon="fa-regular fa-circle-question"
                            style="font-size: 100%"
                            label="Preguntar"
                            @click="questionMenuOpen = true"
                        >
                        </q-btn>
                    </div>
                    <div style="padding-right: 10%">
                        <q-btn
                            color="primary"
                            icon="fa-solid fa-gauge-high"
                            style="font-size: 100%"
                        >
                            <q-menu
                                @mousemove="toggleVideoControlsOnForTwoSeconds"
                                transition-show="jump-up"
                                transition-hide="jump-down"
                                v-model="menuOpen"
                                fit
                            >
                                <q-btn-toggle
                                    v-model="playbackRate"
                                    push
                                    glossy
                                    toggle-color="primary"
                                    :options="playbackRateOptions"
                                    :stack="true"
                                    @click="handleSelection()"
                                    :class="{ hidden: !showControls }"
                                />
                            </q-menu>
                        </q-btn>
                    </div>
                    <button @click="toggleFullScreen">
                        <div v-if="!isFullScreen">
                            <i
                                class="fa-solid fa-up-right-and-down-left-from-center"
                            ></i>
                        </div>
                        <div v-if="isFullScreen">
                            <i
                                class="fa-solid fa-down-left-and-up-right-to-center"
                            ></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <q-dialog v-model="questionMenuOpen">
        <q-card>
            <q-card-section>
                <div class="text-h4">Crear pregunta</div>
                <q-select
                    class="q-mt-md"
                    v-model="createQuestionSelectedOption"
                    :options="questionOptions"
                    label="Tipo de pregunta"
                    emit-value
                    map-options
                    @update:model-value="handleQuestionCreation()"
                />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn
                    color="primary"
                    label="Cancelar"
                    @click="questionMenuOpen = false"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect, inject } from 'vue';
import { formatTime } from 'src/utils';
import { api } from 'src/boot/axios';
import { updateCreateVideoUser } from 'src/endpoints/video';

const videoPlayer = ref();
const videoIsPlayed = ref(false);
const duration = ref(0);
const durationStr = ref('00:00');
const currentTime = ref(0);
const currentTimeStr = ref('00:00');
const showControls = ref(true);
const toggleInProgress = ref(false);
const mouseMoving = ref(false);
const videoPlayerContainer = ref();
const timeOuts: any[] = [];
const isFullScreen = ref(false);
const volume = ref(1);
const state: any = inject('state');
const createAlternativeQuestionState: any = inject(
    'createAlternativeQuestionState'
);
const createTOFQuestionState: any = inject('createTOFQuestionState');
const createEssayQuestionState: any = inject('createEssayQuestionState');

const playbackRate = ref(1.0);
const menuOpen = ref(false);
const createQuestionSelectedOption = ref();
const questionMenuOpen = ref(false);
let previous_time = 1;

const props = defineProps<{
    url: string | null;
    id?: string;
}>();

const playbackRateOptions = [
    {
        label: '0.5',
        value: '0.5',
    },
    {
        label: '1.0',
        value: '1.0',
    },
    {
        label: '1.5',
        value: '1.5',
    },
    {
        label: '1.75',
        value: '1.75',
    },
    {
        label: '2.0',
        value: '2.0',
    },
];

const questionOptions = [
    { label: 'Alternativas', value: 'AQ' },
    { label: 'V o F', value: 'TOFQ' },
    { label: 'Desarrollo', value: 'EQ' },
];

const emit = defineEmits<{
    (e: 'current-time-change', val: number): number;
    (e: 'create-alternative-question', time: number): void;
    (e: 'create-TOF-question', time: number): void;
    (e: 'create-essay-question', time: number): void;
}>();

const toggleFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoPlayerContainer.value.requestFullscreen();
    }
};

const handleChangeFullScreen = () => {
    isFullScreen.value = !isFullScreen.value;
};

const seekVideo = (event: any) => {
    videoPlayer.value.currentTime = event.target.value;
};

const togglePlay = () => {
    if (!videoIsPlayed.value) {
        handlePlay();
    } else if (videoIsPlayed.value) {
        handlePause();
    }
};

const handlePlay = () => {
    videoPlayer.value.play();
    videoIsPlayed.value = true;
    toggleVideoControlsOff();
};

const handlePause = () => {
    videoPlayer.value.pause();
    showControls.value = true;
    videoIsPlayed.value = false;
    clearAllTimeOuts();
};

const toggleVideoControlsOff = () => {
    if (!toggleInProgress.value) {
        const timeoutId = setTimeout(() => {
            if (videoIsPlayed.value) {
                showControls.value = false;
                menuOpen.value = false;
            }
            toggleInProgress.value = false;
        }, 2000);
        timeOuts.push(timeoutId);
    }
};

let mousePointerTimeoutId: any;

const mouseEnterVideoPlayer = () => {
    showControls.value = true;
    mousePointerTimeoutId = setTimeout(function () {
        if (videoPlayerContainer.value) {
            videoPlayerContainer.value.style.cursor = 'none'; // Hide the mouse pointer
        }
    }, 2000); // 2000 milliseconds (2 seconds)
};

const toggleVideoControlsOffInstantly = () => {
    if (videoIsPlayed.value) {
        showControls.value = false;
    }
    if (videoPlayerContainer.value) {
        // Clear the timeout and restore the cursor style when the mouse leaves the div
        clearTimeout(mousePointerTimeoutId);
        videoPlayerContainer.value.style.cursor = 'pointer'; // Change to your desired default cursor style
    }
};

const toggleVideoControlsOnForTwoSeconds = () => {
    setMouseMove();
    clearAllTimeOuts();
    clearTimeout(mousePointerTimeoutId);
    videoPlayerContainer.value.style.cursor = 'pointer'; // Change to your desired default cursor style
    mouseMoving.value = true;
    mousePointerTimeoutId = setTimeout(function () {
        if (videoPlayerContainer.value) {
            videoPlayerContainer.value.style.cursor = 'none'; // Hide the mouse pointer
        }
    }, 2000); // 2000 milliseconds (2 seconds)
    if (!toggleInProgress.value) {
        toggleInProgress.value = true;
        showControls.value = true;
        const timeoutId = setTimeout(() => {
            if (videoIsPlayed.value && !mouseMoving.value) {
                showControls.value = false;
                menuOpen.value = false;
            }
            toggleInProgress.value = false;
        }, 2000);
        timeOuts.push(timeoutId);
    }
};

const clearAllTimeOuts = () => {
    for (const id of timeOuts) {
        clearTimeout(id);
    }
    toggleInProgress.value = false;
};

const setMouseMove = () => {
    if (!mouseMoving.value) {
        setTimeout(() => {
            mouseMoving.value = false;
        }, 100);
    }
};

const updateProgress = async () => {
    const time = Math.floor(videoPlayer.value.currentTime);
    currentTime.value = time;
    console.log(currentTime.value, props.id);
    if (currentTime.value === duration.value && props.id) {
        try {
            const { data, status } = await api.post(
                updateCreateVideoUser(props.id),
                {
                    is_completed: true,
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    currentTimeStr.value = formatTime(time);
    if (previous_time !== time) {
        emit('current-time-change', getSeconds(currentTime.value));
    }
    previous_time = time;
};

const setDuration = () => {
    const updatedDuration = formatTime(videoPlayer.value.duration);
    duration.value = Math.floor(videoPlayer.value.duration);
    durationStr.value = updatedDuration;
};

const getSeconds = (time: number) => {
    const seconds = Math.floor(time);
    return seconds;
};

const handlePopUpActivation = () => {
    if (
        state.alternativePopUp === true ||
        state.essayPopUp === true ||
        state.tofPopUp === true ||
        createAlternativeQuestionState.popUp === true ||
        createTOFQuestionState.popUp === true ||
        createEssayQuestionState.popUp === true
    ) {
        handlePause();
    }
};

const handleSelection = () => {
    menuOpen.value = false;
};

const handleAlternativeQuestionCreation = () => {
    emit('create-alternative-question', getSeconds(currentTime.value));
};

const handleTORQuestionCreation = () => {
    emit('create-TOF-question', getSeconds(currentTime.value));
};

const handleEssayQuestionCreation = () => {
    emit('create-essay-question', getSeconds(currentTime.value));
};

const handleQuestionCreation = () => {
    questionMenuOpen.value = false;
    if (createQuestionSelectedOption.value === 'AQ') {
        handleAlternativeQuestionCreation();
    } else if (createQuestionSelectedOption.value === 'TOFQ') {
        handleTORQuestionCreation();
    } else if (createQuestionSelectedOption.value === 'EQ') {
        handleEssayQuestionCreation();
    }
    createQuestionSelectedOption.value = null;
};

onMounted(() => {
    videoPlayer.value.src = props.url;
    videoPlayer.value.addEventListener('timeupdate', updateProgress);
    videoPlayer.value.addEventListener('loadedmetadata', setDuration);
    watchEffect(() => {
        videoPlayer.value.volume = volume.value;
    });
    watchEffect(() => {
        videoPlayer.value.playbackRate = playbackRate.value;
    });
    watchEffect(() => {
        handlePopUpActivation();
    });
});
</script>

<style>
.video-player-container {
    width: 100%;
    position: relative;
    display: inline-block;
}

.video-player {
    width: 100%;
    display: block;
}

/* Video player control bar */
.video-controls {
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0%;
    left: 0;
    width: 100%;
    height: 15%;
}

/* Video player control bar */
.button-container {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 100%;
}

.button-container-left {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding-right: 2%;
    padding-left: 2%;
    width: 100%;
}

.button-container-right {
    display: flex;
    padding-right: 2%;
    padding-left: 2%;
    width: 100%;
    white-space: nowrap;
    justify-content: flex-end;
}

/* Control buttons */
.video-controls button {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 2vw;
    display: flex;
}

.progress-bar {
    width: 100%;
    cursor: pointer;
}

.time {
    align-items: center;
    font-size: 2vw;
    display: inline;
    padding-left: 5%;
}

.volume-input {
    width: 30%;
    cursor: pointer;
}
</style>
