const container = document.querySelector('.container'),
mainVideo = container.querySelector('video'),
progressBar = container.querySelector('.progress_bar'),
volumeBtn = container.querySelector('.volume i'),
volumeSlider = container.querySelector('.left input'),
skipBackward = container.querySelector('.skip_backward i'),
skipForward = container.querySelector('.skip_forward i'),
speedBtn = container.querySelector('.playback_speed span'),
videoduration = container.querySelector('.video_duretion'),
speedOption = container.querySelector('.speed-options'),
picInPicBtn = container.querySelector('.pic_in_pic span'),
videoTimeLine = container.querySelector('.video_timeline'),
currentvideotime = container.querySelector('.current_time'),
fullscreenBtn = container.querySelector('.fullscreen i'),
playPauseBtn = container.querySelector('.play_pause i');
let timer; 

const hideControls = () => {
    if(mainVideo.paused) return; // if video paused return 
    timer = setTimeout(() => { // remove show-controls class after 3
        container.classList.remove('show-controls'); 
    }, 3000);
}

hideControls();

container.addEventListener('mousemove', () => {
    container.classList.add('show-controls'); // add show-controls class on mousemove
    clearTimeout(timer); // clear timer 
    hideControls(); // calling hideControls

});

const formatTime = time => {
    let seconds = Math.floor(time % 60 ),
    minutes = Math.floor(time / 60 ) % 60,
    hours = Math.floor(time / 3600 );

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0 ){
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}



mainVideo.addEventListener('timeupdate', e => {
    let { currentTime, duration} = e.target; // getting currentTime & duration of the video 
    let percent = (currentTime / duration) * 100; // getting parcent
    progressBar.style.width = `${percent}%`;  // passing parcent as progressbar width
    currentvideotime.innerText = formatTime(currentTime);
});

volumeSlider.addEventListener('input', e => {
    mainVideo.volume = e.target.value; // passing slider value as video volume
    if(e.target.value == 0 ){
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');

    } else {
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
    }
});

mainVideo.addEventListener('loadeddata', e => {
    videoduration.innerText = formatTime(e.target.duration); // passing video duration as videoDuration innertext  
});

const draggableProgressBar = e => {
    
    let timelinewidth = videoTimeLine.clientWidth; // getting video timeline width
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelinewidth) * mainVideo.duration; // updating video current time
    currentvideotime.innerText = formatTime( mainVideo.currentTime);
};
videoTimeLine.addEventListener('mousedown', () => { // caling draggabbleProgressBar funtion on mousemove event
    videoTimeLine.addEventListener('mousemove', draggableProgressBar);
});

videoTimeLine.addEventListener('mousemove', e => {
    const progressTime = videoTimeLine.querySelector('span');
    let offsetX = e.offsetX; // getting mouse x position
    progressTime.style.left = `${offsetX}px`; // passing offsetX value as progresstime laft value
    let timelinewidth = videoTimeLine.clientWidth;
    let parcent = (e.offsetX / timelinewidth) * mainVideo.duration;
    progressTime.innerText = formatTime(parcent);
});

container.addEventListener('mouseup', () => { // caling draggabbleProgressBar funtion on mousemove event
    videoTimeLine.removeEventListener('mousemove', draggableProgressBar);
});

speedBtn.addEventListener('click', () => {
    speedOption.classList.toggle('show'); // toggel show
});


videoTimeLine.addEventListener('click', e => {
    let timelinewidth = videoTimeLine.clientWidth; // getting video timeline width
    mainVideo.currentTime = (e.offsetX / timelinewidth) * mainVideo.duration; // updating video current time
    
});

speedOption.querySelectorAll('li').forEach(option =>{
    option.addEventListener('click', () => { // add click event on all speed option
        mainVideo.playbackRate = option.dataset.speed; // passing option dataset value as video playback value
        speedOption.querySelector('.active').classList.remove('active'); // remove active class
        option.classList.add('active'); // adding active class on the selected option
    });
} );
document.addEventListener('click', e => { // hide speed options on documant click
    if(e.target.tagName !== 'SPAN' || e.target.className !== 'material-symbols-outlined' )
    speedOption.classList.remove('show');
});

picInPicBtn.addEventListener('click', () => {
    mainVideo.requestPictureInPicture(); // changing video mode to picture in picture
});

fullscreenBtn.addEventListener('click', () => {
    container.classList.toggle('fullscreen');
    if(document.fullscreenElement) { // if video is already in fullscreen mode 
        fullscreenBtn.classList.replace('fa-compress', 'fa-expand');
        return document.exitFullscreen();
    }
    fullscreenBtn.classList.replace('fa-expand', 'fa-compress');
     container.requestFullscreen(); //go to fullscreen mode 
});

volumeBtn.addEventListener('click', () => {
    if(!volumeBtn.classList.contains('fa-volume-high')){ // if volume icon isn't volume high icon
        mainVideo.volume = 0.5; // passing 0.5 value as video volume
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
    } else {
        mainVideo.volume = 0.0; // passing 0.0 value as video volume, so the video mute
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');

    }
    volumeSlider.value = mainVideo.volume;
});


skipBackward.addEventListener('click', () => {
 mainVideo.currentTime -= 5; //subract 5 second from the current time 
});

skipForward.addEventListener('click', () => {
    mainVideo.currentTime += 5; // add 5 second to the current time 
   });


playPauseBtn.addEventListener('click', () => {
    // if video is paused, play the video else pause the video
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener( 'play', () => { // if video is play, change icon to pause
    playPauseBtn.classList.replace('fa-play', 'fa-pause');
});
mainVideo.addEventListener( 'pause', () => { // if video is pause, change icon to play
    playPauseBtn.classList.replace('fa-pause', 'fa-play');
});

var videos = ['video1.mp4','video2.mp4','video3.mp4','video4.mp4'];
var currentvideo = document.getElementById('vid');
var newvideo = document.getElementById("myvideo");

var i = 0;
function nextVideo() {

    if(i < 3){
        i++;
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
    }
    
    currentvideo.setAttribute("src", videos[i]);
    newvideo.load();
}

function backVideo() {

    if(i > 0){
        i--;
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
    }
    
    currentvideo.setAttribute("src", videos[i]);
    newvideo.load();
}



