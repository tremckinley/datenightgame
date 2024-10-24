//Global Variables
//Doors Access
let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");

//Door Paths [flashlight, vacuum, ghost]
const ghostDoorPath = "<img src='./resources/ghost-door.png'>";
const flowerDoorPath = "<img src='./resources/flash-door.png'>";
const ringDoorPath = "<img src='./resources/hoover-door.png'>";
const closedDoorPath = "<img src='./resources/shut-door.png'>";

//Doors variables
let numClosedDoors = 3;
let openDoor1 = '';
let openDoor2 = '';
let openDoor3 = '';


const startButton = document.getElementById("start");

let currentlyPlaying = true;
//End Global Variables

const isGhost = (door) => {
  if(door.src === ghostDoorPath) {
    return true;
  } else {
    return false;
  }
}

//Is Clicked Function
const isClicked = (door) => {
  if(door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

//Play Door Function
const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors===0) {
    gameOver('win');
  } else if(isGhost(door)) {
    gameOver();
  }
};

//Random Door Location Generator
let randomFrightDoorGenerator = () => {
  let theDoors = [ghostDoorPath, ringDoorPath, flowerDoorPath];
  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };
  shuffle(theDoors);
  openDoor1 = theDoors[0];
  openDoor2 = theDoors[1];
  openDoor3 = theDoors[2];
};

//New Round Function
const startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage1.innerHTML = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage2.innerHTML = closedDoorPath;
  doorImage3.src = closedDoorPath;
  doorImage3.innerHTML = closedDoorPath;
  startButton.innerHTML = 'Good luck!'
  currentlyPlaying = true;
  startButton.style.backgroundColor = 'darkorange'
  randomFrightDoorGenerator();
}

const gameOver = (status) => {
  if(status === "win") {
    startButton.innerHTML = 'You win! <i class="fa-solid fa-face-smile-wink gameovericon"></i> Play again?';
    startButton.style.backgroundColor = 'green'
  } else {
    startButton.innerHTML = 'Oh No! <i class="fas fa-skull gameovericon"></i> Play again?';
    startButton.style.backgroundColor = 'red'
  }
  currentlyPlaying = false;
}

//Door Click Functions
doorImage1.onclick = () => {
  if(currentlyPlaying && (isClicked(doorImage1)===false)) {
    doorImage1.src = openDoor1
    doorImage1.innerHTML = doorImage1.src
    playDoor(doorImage1);
  }
};
doorImage2.onclick = () => {
  if(currentlyPlaying && (isClicked(doorImage2)===false)) {
    doorImage2.src = openDoor2
    doorImage2.innerHTML = doorImage2.src
    playDoor(doorImage2);
  }
};
doorImage3.onclick = () => {
  if(currentlyPlaying && (isClicked(doorImage3)===false)) { 
    doorImage3.src = openDoor3
    doorImage3.innerHTML = doorImage3.src
    playDoor(doorImage3);
  }
};

//Start Button Function
startButton.onclick = () => {
  if(!currentlyPlaying) {
    startRound();
  }
};

startRound();