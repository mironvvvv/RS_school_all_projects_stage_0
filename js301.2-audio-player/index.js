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
const backgroundBlur = document.querySelector('.background-blur');

const tracks = [
    {
        title: "Creep",
        artist: "Radiohead",
        src: "assets/audio/rediohead-creep.mp3",
        image: "assets/img/creep.png"
    },
    {
        title: "Karma Police",
        artist: "Radiohead",
        src: "assets/audio/karma-police.mp3",
        image: "assets/img/karma-police.jpg"
    },
    {
        title: "No suprises",
        artist: "Radiohead",
        src: "assets/audio/no-suprises.mp3",
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
    backgroundBlur.style.backgroundImage = `url(${track.image})`; // Меняем задний фон
    audio.load();
    isPlay = false;  // Останавливаем воспроизведение при загрузке нового трека
    playPauseBtn.textContent = '▶️'; 
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
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    durationElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
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
    audio.play();  // Автоматически запускаем воспроизведение
    isPlay = true; // Обновляем флаг, чтобы кнопка Play/Pause была в правильном состоянии
    playPauseBtn.textContent = '⏸';  // Меняем текст кнопки
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(trackIndex);
    audio.play();  // Автоматически запускаем воспроизведение
    isPlay = true; // Обновляем флаг
    playPauseBtn.textContent = '⏸';  // Меняем текст кнопки
}

playPauseBtn.addEventListener('click', playPauseTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', setProgress);

loadTrack(trackIndex);
