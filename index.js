const pianokeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKey = [],
audio = new Audio("tunes/a.wav"); //
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`
    audio.play();
    
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}


pianokeys.forEach(key => {
    allKey.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handelvolume = (e) =>{
    audio.volume = e.target.value;
}
const showHideKeys = (e) =>{
    pianokeys.forEach(key => key.classList.toggle("hide"))
}
const pressedKey = (e) => {
    if(allKey.includes(e.key)) playTune(e.key);
}




keysCheckbox.addEventListener("click" , showHideKeys);
volumeSlider.addEventListener("input" , handelvolume);
document.addEventListener("keydown" , pressedKey);