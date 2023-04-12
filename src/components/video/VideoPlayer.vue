<template>
    <div
        class="video-player-container"
        @mouseenter="showControls = true"
        @mousemove="toggleVideoControlsOnForTwoSeconds"
        @mouseleave="toggleVideoControlsOff"
    >
        <video
            class="video-player"
            ref="videoPlayer"
            @click="togglePlay"
        ></video>
        <div class="video-controls" :class="{ hidden: !showControls }">
            <button class="play-button" @click="togglePlay">
                {{ videoIsPlayed ? 'Pause' : 'Play' }}
            </button>
            <input
                type="range"
                min="0"
                :max="duration"
                :value="currentTime"
                @input="seekVideo"
            />

            <div class="time">{{ currentTimeStr }} / {{ durationStr }}</div>
            <button class="control-button" @click="toggleFullScreen">
                full screen
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const videoPlayer = ref(null);
const videoIsPlayed = ref(false);
const duration = ref(0);
const durationStr = ref('00:00');
const currentTime = ref(0);
const currentTimeStr = ref('00:00');
const showControls = ref(true);
const toggleInProgress = ref(false);
const mouseMoving = ref(false);

const toggleFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoPlayer.value.requestFullscreen();
    }
};

const seekVideo = (event) => {
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
    console.log('Video paused');
};

const toggleVideoControlsOff = () => {
    if (!toggleInProgress.value) {
        setTimeout(() => {
            if (videoIsPlayed.value) {
                showControls.value = false;
            }
            toggleInProgress.value = false;
        }, 2000);
    }
};

const toggleVideoControlsOnForTwoSeconds = () => {
    setMouseMove();
    mouseMoving.value = true;
    if (!toggleInProgress.value) {
        toggleInProgress.value = true;
        showControls.value = true;
        setTimeout(() => {
            if (videoIsPlayed.value & !mouseMoving.value) {
                showControls.value = false;
            }
            toggleInProgress.value = false;
        }, 2000);
    }
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

const formatTime = (time) => {
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
}

.video-player {
    display: block;
    width: 100%;
}

/* Video player control bar */
.video-controls {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
}

/* Control buttons */
.video-controls button {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    margin-right: 10px;
}

input[type='range'] {
    width: 80%;
    margin: 0;
    padding: 0;
    cursor: pointer;
}

.time {
    margin-left: 1%;
    margin-right: 1%;
}

.video-player-container:fullscreen {
    width: 100vw;
    height: 100vh;
}

.video-player:fullscreen {
    width: 100%;
    height: 100%;
}
</style>
