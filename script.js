let currentTrackIndex = 0;
let tracks = [];
const player = document.getElementById('player');
const playlistEl = document.getElementById('playlist');
const progressBar = document.querySelector('.player__progress-bar');

document.getElementById('audioInput').addEventListener('change', (event) => {
  const files = Array.from(event.target.files);
  tracks = files.map((file, index) => ({
    name: file.name,
    url: URL.createObjectURL(file),
    file
  }));

  playlistEl.innerHTML = '';
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.name;
    li.addEventListener('click', () => playTrack(index));
    playlistEl.appendChild(li);
  });

  if (tracks.length > 0) {
    playTrack(0);
  }
});

function playTrack(index) {
  currentTrackIndex = index;
  player.src = tracks[index].url;
  player.play();
  updatePlaylistUI();
}

function updatePlaylistUI() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, i) => {
    item.classList.toggle('active-song', i === currentTrackIndex);
  });
}

document.getElementById('playBtn').addEventListener('click', () => {
  player.play();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  player.pause();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (tracks.length > 0) {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (tracks.length > 0) {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
  }
});

player.addEventListener('timeupdate', () => {
  const progress = (player.currentTime / player.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

progressBar.parentElement.addEventListener('click', (e) => {
  const width = progressBar.parentElement.offsetWidth;
  const clickX = e.offsetX;
  const percent = (clickX / width) * 100;
  player.currentTime = (player.duration / 100) * percent;
});
