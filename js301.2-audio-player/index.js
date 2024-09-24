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
        playPauseBtn.src = 'assets/svg/pause.svg';
        playPauseBtn.classList.add('pause');
        playPauseBtn.classList.remove('play');
    } else {
        audio.pause();
        isPlay = false;
        playPauseBtn.src = 'assets/svg/play_arrow_40dp_531607_FILL0_wght400_GRAD0_opsz40.svg';
        playPauseBtn.classList.add('play');
        playPauseBtn.classList.remove('pause');
        
    }
}

function updateProgressBar() {
    if (audio.duration) { 
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        progressBar.style.setProperty('--progress-percent', `${progressPercent}%`);

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
    if (isPlay) audio.play();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(trackIndex);
    if (isPlay) audio.play();
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

progressBar.addEventListener('input', function() {
    const progressPercent = this.value;
    const newTime = (progressPercent / 100) * audio.duration; 
    audio.currentTime = newTime; 
});


audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        
        progressBar.style.setProperty('--progress-percent', `${progressPercent}%`);

       
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);
        durationElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }
}


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
 

loadTrack(trackIndex);
