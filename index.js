// when i click the play button, it changes state to the certain essay, plays the song, opens
var state = 0

const songNames = ["Description", "Jupiter", "Allegro Brilliante", "Toreador", "Symphony No. 4 In A Major"]

changeEssay()

function pauseClick(event=null){
    var icon;
    if (event){
        icon = event.currentTarget

        if (icon.className === "fas fa-play"){
            icon.className = "fas fa-pause"
            playSong()
        }
        else{
            icon.className = "fas fa-play"
            pauseSong()
        }
    }
    else{
        icon = document.getElementById("play-button")
        icon.className = "fas fa-pause"
        playSong()
    }
    
    
}

function playSong(){
    const audioElement = document.querySelector('audio');
    if (state > 0){
        audioElement.play(); // Play the audio
    }
    
    

}

function pauseSong(){
    const audioElement = document.querySelector('audio');
    
    audioElement.pause();
}

function changeSong(){
    
    const audioElement = document.querySelector('audio');
    audioElement.src = `assets/song-${state}.mp3`; // Change the source
    audioElement.load(); // Reload the audio element to reflect the change

    document.getElementById("current-song-title").textContent = songNames[state];

    playSong()
    pauseClick()

}

function changeEssay(){
    document.getElementById("essay-title").textContent = songNames[state]
    fetch(`assets/song-${state}.txt`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            return response.text();
        })
        .then(text => {
            document.getElementById("essay-text").textContent = text;
        })
        .catch(error => {
            console.error('Error loading text file:', error);
        });
    
}

function changeState(s){
    state = s
    changeSong()
    changeEssay()
}

function nextClick(event){
    if (state < 5){
        state += 1
    }
    console.log(state)
    changeSong()
    changeEssay()
}

function backClick(event){
    if (state > 0){
        state -= 1
    }
    console.log(state)
    changeSong()
    changeEssay()
}