  window.onload = function() {
    var musicList = [{
        "src": "musicList/Thomas Junior - I Can't Make You Love Me.mp3",
        "title": "I Can't Make You Love Me",
        "singer": "Thomas Junior"
    },{
        "src": "musicList/Joshua Hyslop - The Flood.mp3",
        "title": "The Flood",
        "singer": "Joshua Hyslop"
    },{
        "src": "musicList/Sofi de la Torre - A Little Bit.mp3",
        "title": "A Little Bit",
        "singer": "Sofi de la Torre"
    },{
        "src": "musicList/Taylor Thrash - Slippin.mp3",
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
  };
