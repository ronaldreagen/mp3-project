const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const lyricsEl = document.getElementById("lyrics");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("forward");
const backwardBtn = document.getElementById("backward");
document.getElementById("next-track").addEventListener("click", nextTrack);
document.getElementById("prev-track").addEventListener("click", prevTrack);


// Track list
const tracks = [
  {
    title: "About You",
    artist: "The 1975",
    src: "The 1975 - About You (Official).mp3",
    cover: "cover1.jpg",
    background: "linear-gradient(to right,rgb(224, 233, 237),rgb(161, 178, 183),rgb(87, 107, 116))",
    lyrics: [
      { time: 45.18, text: "I know a place" },
      { time: 54.83, text: "It's somewhere I go when I need to remember your face" },
      { time: 64.43, text: "We get married in our heads" },
      { time: 74.98, text: "Something to do while we try to recall how we met" },
      { time: 84.36, text: "Do you think I have forgotten?" },
      { time: 89.52, text: "Do you think I have forgotten?" },
      { time: 94.57, text: "Do you think I have forgotten" },
      { time: 99.52, text: "About you?" },
      { time: 104.56, text: "You and I (don't let go) were alive (don't let go)" },
      { time: 114.70, text: "With nothing to do, I could lay and just look in your eyes" },
      { time: 124.87, text: "Wait (don't let go) and pretend (don't let go)" },
      { time: 135.13, text: "Hold on and hope that we'll find our way back in the end (in the end)" },
      { time: 144.36, text: "Do you think I have forgotten?" },
      { time: 149.56, text: "Do you think I have forgotten?" },
      { time: 154.51, text: "Do you think I have forgotten" },
      { time: 159.29, text: "About you?" },
      { time: 164.43, text: "Do you think I have forgotten?" },
      { time: 169.42, text: "Do you think I have forgotten?" },
      { time: 174.47, text: "Do you think I have forgotten" },
      { time: 179.32, text: "About you?" },
      { time: 184.53, text: "And there was something 'bout you that now I can't remember" },
      { time: 190.14, text: "It's the same damn thing that made my heart surrender" },
      { time: 194.93, text: "And I miss you on a train, I miss you in the morning" },
      { time: 200.09, text: "I never know what to think about" },
      { time: 204.09, text: "I think about you" },
      { time: 209.49, text: "About you (so don't let go)" },
      { time: 214.36, text: "Do you think I have forgotten" },
      { time: 219.56, text: "About you? (don't let go)" },
      { time: 224.53, text: "About you" },
      { time: 229.44, text: "About you" },
      { time: 234.44, text: "Do you think I have forgotten" },
      { time: 239.42, text: "About you?" },
      { time: 320.47, text: "How you feeling?" },
      { time: 324.38, text: "" }
    ]
},
]

let currentTrackIndex = 0;

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  document.querySelector(".cover").src = track.cover;
  document.querySelector(".song-info h3").textContent = track.title;
  document.querySelector(".song-info p").textContent = `${track.artist} — ${track.title}`;
  renderLyrics(track.lyrics);
  audio.load();
}

function renderLyrics(lyrics) {
  lyricsEl.innerHTML = "";
  lyrics.forEach((line) => {
    const div = document.createElement("div");
    div.className = "lyric-line";
    div.dataset.time = line.time;
    div.textContent = line.text;
    lyricsEl.appendChild(div);
  });
}

function updateLyrics(currentTime) {
  const lines = document.querySelectorAll(".lyric-line");
  lines.forEach((line, index) => {
    const time = parseFloat(line.dataset.time);
    const next = lines[index + 1];
    if (currentTime >= time && (!next || currentTime < parseFloat(next.dataset.time))) {
      lines.forEach(l => l.classList.remove("active"));
      line.classList.add("active");
      line.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '❚❚';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
}

function skipForward() {
  audio.currentTime += 5;
}

function skipBackward() {
  audio.currentTime -= 5;
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.textContent = '❚❚x';
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.textContent = '❚❚';
}

// EVENTS
playBtn.addEventListener("click", togglePlayPause);
forwardBtn.addEventListener("click", nextTrack);
backwardBtn.addEventListener("click", prevTrack);

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progress.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
  updateLyrics(currentTime);
});

audio.addEventListener("ended", () => {
  playBtn.textContent = '▶';
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;
  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlayPause();
      break;
    case "ArrowRight":
      skipForward();
      break;
    case "ArrowLeft":
      skipBackward();
      break;
    case "BracketRight": // ⏭️
      nextTrack();
      break;
    case "BracketLeft": // ⏮️
      prevTrack();
      break;
  }
});

// Load first track on start
document.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentTrackIndex);
});

backwardBtn.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 5); // Rewind 5 sec
  });
  
  forwardBtn.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); // Skip 5 sec
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "MediaTrackPrevious") {
      document.getElementById("prev-track")?.click(); // Simulate previous track button
    }
    if (event.code === "MediaTrackNext") {
      event.preventDefault(); // Prevent fullscreen toggle
      document.getElementById("next-track")?.click(); // Simulate next track button
    }
  });

  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    document.querySelector(".cover").src = track.cover;
    document.querySelector(".song-info h3").textContent = track.title;
    document.querySelector(".song-info p").textContent = `${track.artist} — ${track.title}`;
    document.body.style.background = track.background; // ← ini bagian pentingnya
    renderLyrics(track.lyrics);
    audio.load();
  }
  
