# Apple Music-Inspired Web Music Player# 🎵 Apple Music-Inspired Web Music Player

This project is a **web-based music player** with a modern interface and synchronized lyrics, inspired by the Apple Music design. Built using **HTML**, **CSS**, and **JavaScript**, this player allows you to play songs, view track info, and highlight lyrics in real-time.

## 🔧 Features

- 🎧 Play local MP3 tracks
- ⏱️ Display current time and track duration
- 🎼 Auto-synchronized lyrics (injected via JavaScript)
- ⏮⏯⏭ Playback controls: play/pause, next, previous, forward, backward
- 💿 Album cover display
- ✨ Modern glassmorphism interface with smooth transitions

## 🗂 Project Structure

```
.
├── home.html       # Main HTML structure
├── style.css       # Styling for layout, controls, and effects
├── script.js       # Logic for audio control and lyric sync
├── cover1.jpg      # Album cover image (recommended 1:1 ratio)
├── The 1975 - About You (Official).mp3  # Audio file, The name of the Audio file needs to be changed.
└── spotify.png     # Optional favicon
```

## 🚀 How to Run

1. Ensure all files are in the same directory.
2. Open `home.html` in your browser.
3. The song and lyrics will load and be ready to play.

> 🎤 Lyrics are auto-loaded and synced via the JavaScript file.

## 📦 Dependencies

- Google Fonts: [`Inter`](https://fonts.google.com/specimen/Inter)
- A modern browser that supports HTML5 Audio API

## 📝 Usage Notes

- Ensure the audio (`.mp3`) and image (`.jpg`) files use the **same names as in the HTML**, or update the `src` attributes in `home.html`.
- You can add more tracks and lyrics by modifying `script.js`.

## 💡 Future Improvements

- Playlist support
- Drag & drop songs
- Load lyrics from `.lrc` files
- Mobile responsive layout
