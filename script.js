const audio = document.getElementById('audio');
const songList = document.querySelectorAll('#song-list li');
const menu = document.getElementById('menu');
const nowPlaying = document.getElementById('now-playing');
const nowTitle = document.getElementById('now-title');

let currentSong = 0;
let isPlaying = false;

const songs = [
  'songs/ABBA - The Winner Takes It All.mp3',
  'songs/Conan Gray - Never Ending Song.mp3',
  'songs/Taylor Swift - The Prophecy.mp3',
  'songs/Gotye - Somebody That I Used To Know.mp3',
  'songs/song5.mp3',
  'songs/Bastille - Pompeii.mp3',
];

function updateSelected(index) {
  songList.forEach((li, i) => {
    li.classList.toggle('selected', i === index);
  });
}

function playSong(index) {
  currentSong = index;
  audio.src = songs[index];
  audio.play();
  isPlaying = true;
  nowTitle.textContent = `Playing: ${songList[index].textContent}`;
  showNowPlaying();
}

function showMenu() {
  menu.classList.add('active');
  nowPlaying.classList.remove('active');
}

function showNowPlaying() {
  menu.classList.remove('active');
  nowPlaying.classList.add('active');
}

document.getElementById('menu-btn').addEventListener('click', showMenu);

document.getElementById('select-btn').addEventListener('click', () => {
  playSong(currentSong);
});

document.getElementById('play-pause-btn').addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
});

document.getElementById('prev-btn').addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  updateSelected(currentSong);
  playSong(currentSong);
});

document.getElementById('next-btn').addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  updateSelected(currentSong);
  playSong(currentSong);
});

document.addEventListener('keydown', (e) => {
  if (menu.classList.contains('active')) {
    if (e.key === 'ArrowUp') {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      updateSelected(currentSong);
    } else if (e.key === 'ArrowDown') {
      currentSong = (currentSong + 1) % songs.length;
      updateSelected(currentSong);
    }
  }
});
