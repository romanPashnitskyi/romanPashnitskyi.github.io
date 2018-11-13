const songs = [{
  title: 'Angetenar',
  author: 'Rompasso',
  src: 'src/media/Rompasso - Angetenar.mp3',
  img: 'src/images/Rompasso - Angetenar.jpg'
}, {
  title: 'You are Beautiful',
  author: 'James Blunt',
  src: 'src/media/James Blunt - You are Beautiful.mp3',
  img: 'src/images/James Blunt - You are Beautiful.jpg'
}, {
  title: 'Numb',
  author: 'Linkin Park',
  src: 'src/media/Linkin Park - Numb.mp3',
  img: 'src/images/Linkin Park - Numb.jpg'
}, {
  title: 'Mosaique',
  author: 'Ash',
  src: 'src/media/Ash – Mosaique.mp3',
  img: 'src/images/Ash – Mosaique.png'
},  {
  title: 'In The End',
  author: 'Tommee Profitt',
  src: 'src/media/Tommee Profitt - In The End.mp3',
  img: 'src/images/Tommee Profitt - In The End.jpg'
}, {
  title: 'Rockstar',
  author: 'Post Malone',
  src: 'src/media/Post Malone - Rockstar.mp3',
  img: 'src/images/Post Malone - Rockstar.jpg'
}];

let playing = true;
const song = document.getElementById('myAudio');
const pauseButton = document.getElementById('pauseButton');
let currentSong = 0;
const goToSong = current => {
  currentSong = (current + songs.length) % songs.length;
  document.getElementById('mp3_src').src = songs[currentSong].src;
  document.getElementById('title').innerHTML = songs[currentSong].title;
  document.getElementById('poster').src = songs[currentSong].img;
  document.getElementById('author').innerHTML = songs[currentSong].author;
  song.load();
  playSong();
};

const previousSong = () => {
  document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.remove('active');
  goToSong(currentSong - 1);
  document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add('active');
};

const nextSong = () => {
  document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.remove('active');
  goToSong(currentSong + 1);
  document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add('active');
};

const pause = () => {
  playing ? pauseSong() : playSong();
};

const pauseSong = () => {
  pauseButton.innerHTML = '&#61;';
  playing = false;
  song.pause();
};

const playSong = () => {
  pauseButton.innerHTML = '&rtrif;';
  playing = true;
  song.play();
};

const changeVolume = () => {
  song.volume = document.getElementById('volume').value / 100;
};

const changeCurrentTime = () => {
  song.currentTime = document.getElementById('currentTime').value * song.duration / 100;
};

const duration = seconds => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
};

const showPlaylist = () => {
  let text = '<h1></h1>';
  const playlist = document.getElementById('playlist');
  songs.forEach(function (item, pos) {
    text += `<div class="song" data-pos=${pos}><h2>${item.title}-${item.author}</h2></div>`;
  });
  playlist.innerHTML = text;
};

const updateTime = () => {
  document.getElementById('Time').innerHTML = duration(song.currentTime);
  document.getElementById('currentTime').value = song.currentTime / song.duration * 100;
};

showPlaylist();
document.querySelectorAll('[data-pos="' + currentSong + '"]')[0].classList.add('active');
setInterval(updateTime, 1000);
