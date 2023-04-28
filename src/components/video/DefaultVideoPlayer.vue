<template>
    <div
        class="video-player-container"
        @mouseenter="showControls = true"
        @mousemove="toggleVideoControlsOnForTwoSeconds"
        @mouseleave="toggleVideoControlsOffInstantly"
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
                <button @click="togglePlay">
                    {{ videoIsPlayed ? 'Pause' : 'Play' }}
                </button>

                <div class="time">{{ currentTimeStr }} / {{ durationStr }}</div>
                <button @click="toggleFullScreen">full screen</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
const timeOuts = ref();

const toggleFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoPlayerContainer.value.requestFullscreen();
    }
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
    console.log('Video played');
};

const handlePause = () => {
    videoPlayer.value.pause();
    showControls.value = true;
    videoIsPlayed.value = false;
    clearAllTimeOuts();
    console.log('Video paused');
};

const toggleVideoControlsOff = () => {
    if (!toggleInProgress.value) {
        const timeoutId = setTimeout(() => {
            if (videoIsPlayed.value) {
                showControls.value = false;
            }
            toggleInProgress.value = false;
        }, 2000);
        timeOuts.value.push(timeoutId);
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
            }
            toggleInProgress.value = false;
        }, 1000);
        timeOuts.value.push(timeoutId);
    }
};

const clearAllTimeOuts = () => {
    for (const id of timeOuts.value) {
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
    const time = videoPlayer.value.currentTime;
    currentTime.value = videoPlayer.value.currentTime;
    currentTimeStr.value = formatTime(time);
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

onMounted(() => {
    videoPlayer.value.src = './test.mp4';
    videoPlayer.value.addEventListener('timeupdate', updateProgress);
    videoPlayer.value.addEventListener('loadedmetadata', setDuration);
});
</script>

<style>
.video-player-container {
    position: relative;
    display: inline-block;
    text-align: center;
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
    height: 10%;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
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

/* Control buttons */
.video-controls button {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 2vw;
    display: flex;
    padding: 0 1% 0 1%;
}

.progress-bar {
    width: 100%;
    cursor: pointer;
}

.time {
    align-items: center;
    font-size: 2vw;
    display: flex;
}
</style>
