var musicList = [{
    "src": "https://github.com/wenhuiyang-luck/MusicPlayer/blob/master/musicList/Thomas%20Junior%20-%20I%20Can't%20Make%20You%20Love%20Me.mp3",
    "title": "I Can't Make You Love Me",
    "singer": "Thomas Junior"
},{
    "src": "https://github.com/wenhuiyang-luck/MusicPlayer/blob/master/musicList/Joshua%20Hyslop%20-%20The%20Flood.mp3",
    "title": "The Flood",
    "singer": "Joshua Hyslop"
},{
    "src": "https://github.com/wenhuiyang-luck/MusicPlayer/blob/master/musicList/Sofi%20de%20la%20Torre%20-%20A%20Little%20Bit.mp3",
    "title": "A Little Bit",
    "singer": "Sofi de la Torre"
},{
    "src": "https://github.com/wenhuiyang-luck/MusicPlayer/blob/master/musicList/Taylor%20Thrash%20-%20Slippin.mp3",
    "title": "Slippin",
    "singer": "Taylor Thrash"
}]

var backBtn = document.querySelector('#musicbox .backward'),
    playBtn = document.querySelector('#musicbox .play'),
    forwardBtn = document.querySelector('#musicbox .forward'),
    titleNode = document.querySelector('#musicbox .title'),
    authorNode = document.querySelector('#musicbox .singer'),
    timeNode = document.querySelector('#musicbox .time'),
    progressBarNode = document.querySelector('#musicbox .bar'),
    progressCurrentNode = document.querySelector('#musicbox .progress-current'),
    timer;

var music = new Audio();
music.autoplay = true;
var musicIndex = 0;

loadMusic(musicList[musicIndex]);

playBtn.onclick = function() {
  var icon = this.querySelector('.fa');
  if (icon.classList.contains('fa-play')) {
    music.play();
  } else {
    music.pause();
  }
  icon.classList.toggle('fa-play');
  icon.classList.toggle('fa-pause');
}

forwardBtn.onclick = loadNextMusic;
backBtn.onclick = loadLastMusic;
music.onended = loadNextMusic;
music.shouldUpdate = true;


music.onplaying = function() {
  timer = setInterval(function() {
    updateProgress();
  }, 1000);
}
music.onpause = function() {
    clearInterval(timer);
  }

progressBarNode.onclick = function(e) {
  var percent = e.offsetX / parseInt(getComputedStyle(this).width);
  music.currentTime = percent * music.duration;
  progressCurrentNode.style.width = percent * 100 + "%";
}

function loadMusic(songObj) {
  music.src = songObj.src;
  titleNode.innerText = songObj.title;
  authorNode.innerText = songObj.singer;
}

function loadNextMusic() {
  musicIndex++;
  musicIndex = musicIndex % musicList.length;
  loadMusic(musicList[musicIndex]);
}

function loadLastMusic() {
  musicIndex--;
  musicIndex = (musicIndex + musicList.length) % musicList.length;
  loadMusic(musicList[musicIndex]);
}

function updateProgress() {
  var percent = (music.currentTime / music.duration) * 100 + '%';
  progressCurrentNode.style.width = percent;

  var minutes = parseInt(music.currentTime / 60);
  var seconds = parseInt(music.currentTime % 60) + '';
  seconds = seconds.length == 2 ? seconds : '0' + seconds;
  timeNode.innerText = '0' + minutes + ':' + seconds;
}
