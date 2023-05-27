<template>
    <div
        class="video-player-container"
        @mouseenter="showControls = true"
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
        <div class="video-controls" :class="{ hidden: !showControls }">
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
                    <div style="padding-right: 10%">
                        <q-btn
                            color="primary"
                            icon="fa-solid fa-gauge-high"
                            size="md"
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
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect, inject } from 'vue';

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
const playbackRate = ref(1.0);
const menuOpen = ref(false);
let previous_time = 1;

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

const emit = defineEmits<{ (e: 'current-time-change', val: number): number }>();

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

const toggleVideoControlsOffInstantly = () => {
    if (videoIsPlayed.value) {
        showControls.value = false;
    }
};

const toggleVideoControlsOnForTwoSeconds = () => {
    setMouseMove();
    clearAllTimeOuts();
    mouseMoving.value = true;
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

const updateProgress = () => {
    const time = Math.floor(videoPlayer.value.currentTime);
    currentTime.value = videoPlayer.value.currentTime;
    currentTimeStr.value = formatTime(time);
    if (previous_time !== time) {
        emit('current-time-change', getSeconds(currentTime.value));
    }
    previous_time = time;
};

const setDuration = () => {
    const updatedDuration = formatTime(videoPlayer.value.duration);
    duration.value = videoPlayer.value.duration.toFixed(2);
    durationStr.value = updatedDuration;
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
};

const getSeconds = (time: number) => {
    const seconds = Math.floor(time);
    return seconds;
};

const handlePopUpActivation = () => {
    if (state.popUp === true) {
        handlePause();
    }
};

const handleSelection = () => {
    menuOpen.value = false;
};

onMounted(() => {
    videoPlayer.value.src = './test2.mp4';
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
    width: 70%;
    position: relative;
    display: inline-block;
}

.video-player {
    width: 100%;
    display: block;
}

/* Video player control bar */
.video-controls {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    flex-direction: column;
    height: 15%;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
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
