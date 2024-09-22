const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackImage = document.getElementById('track-image');

const tracks = [
    {
        title: "Creep",
        artist: "Radiohead",
        src: "assets/audio/radiohead-creep.mp3",
        image: "assets/img/creep.png"
    },
    {
        title: "Karma Police",
        artist: "Radiohead",
        src: "assets/audio/radiohead-karma-police.mp3",
        image: "assets/img/karma-police.jpg"
    },
    {
        title: "No Surprises",
        artist: "Radiohead",
        src: "assets/audio/radiohead-no-surprises.mp3",
        image: "assets/img/no-suprises.jpg"
    }
];

let trackIndex = 0;
let isPlay = false;

function loadTrack(index) {
    const track = tracks[index];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audio.src = track.src;
    trackImage.src = track.image;
    
    audio.load();
    audio.currentTime = 0; 

    
    progressBar.value = 0;
    currentTimeElement.textContent = '0:00';
    durationElement.textContent = '0:00'; 
    
    updateProgressBar();
}

function playPauseTrack() {
    if (!isPlay) {
        audio.play();
        isPlay = true;
        playPauseBtn.classList.add('pause');
        playPauseBtn.classList.remove('play');
        playPauseBtn.textContent = '⏸';
    } else {
        audio.pause();
        isPlay = false;
        playPauseBtn.classList.add('play');
        playPauseBtn.classList.remove('pause');
        playPauseBtn.textContent = '▶️';
    }
}

function updateProgressBar() {
    if (audio.duration) { 
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);
        durationElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % tracks.length;
    loadTrack(trackIndex);
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(trackIndex);
}

playPauseBtn.addEventListener('click', playPauseTrack);
nextBtn.addEventListener('click', () => {
    nextTrack();
    if (isPlay) audio.play();
});
prevBtn.addEventListener('click', () => {
    prevTrack();
    if (isPlay) audio.play(); 
});
audio.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', setProgress);
audio.addEventListener('loadedmetadata', updateProgressBar); 

loadTrack(trackIndex);
