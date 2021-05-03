'use strict'
const music = document.querySelector('audio');
const play = document.querySelector('#play');
const nextSong = document.querySelector("#forward");
const previousSong = document.querySelector("#prev");
const musicName = document.querySelector('#title');
const artist = document.querySelector('#Artist');
const image = document.querySelector('img');
const musicDuration = document.querySelector('#duration');
const currentTime = document.querySelector("#current-time");
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

let songIndex = 0;
const songs = [
    {
        name : 'ghoom.mp3',
        displayName: 'Ghoom',
        artist: 'Junoon'
    },
    {
        name : 'dosti.mp3',
        displayName: 'Dosti',
        artist: 'Junoon'
    },
    {
        name : 'ghoom tana.mp3',
        displayName: 'Ghoom Tana',
        artist: 'Junoon'
    },
]


const playMusic = function(){
    music.play();
    play.setAttribute('title', 'Pause');
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
}
const pauseMusic = function(){
    music.pause();
    play.setAttribute('title', 'Play');
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
}
const timeString = function(duration){
    const durationString = `${String(Math.trunc(duration / 60)).padStart(2,'0')}:${String(Math.trunc(duration%60)).padStart(2,'0')}` ;
    return durationString;
};

document.addEventListener('DOMContentLoaded',playMusic);
play.addEventListener('click',function(e){
    music.paused ? playMusic() : pauseMusic();
});
nextSong.addEventListener("click",function(e){
    if(songIndex == 2){
        songIndex = 0;
        
    }
    else{
        songIndex++;
    }
    loadSongs(songs[songIndex]);
});
previousSong.addEventListener('click',function(){
    if(songIndex == 0){
        songIndex = 2;
        
    }
    else{
        songIndex--;
    }
    loadSongs(songs[songIndex]);
});
music.addEventListener('canplay',function(e){
    console.log(e.target.duration);
    musicDuration.textContent = timeString(e.target.duration);
});

music.addEventListener('timeupdate',function(e){
    currentTime.textContent = timeString(e.target.currentTime);
    const progressPercent = ((e.target.currentTime/e.target.duration) * 100);
    progress.style.width = `${progressPercent}%`;
});

progressContainer.addEventListener('click', function(e){
    const width = this.clientWidth;
    const clickedWidth = e.offsetX;
    const percentageProgress = (clickedWidth / width) * 100;
    progress.style.width = `${percentageProgress}%`;
    music.currentTime = ((percentageProgress)/100) * music.duration;

    console.log(e);
})

const loadSongs = function(song){
    musicName.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}`;
    playMusic();
    
};