const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const navbar = document.querySelector('.navbar')
menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});
menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('change');
} );

var dice, rolls, item, total;
const audio = new Audio();
audio.src = "./sounds/dice.mp3";
const audioL = new Audio();
audioL.src = "./sounds/lost.wav";
const audioW = new Audio();
audioW.src = "./sounds/win.wav";
const audioO = new Audio();
audioO.src = "./sounds/woosh.wav";

// Describe this function...
function do_the_rolls() {
  if(--window.LoopTrap <= 0) throw "Infinite loop.";
  let element_list = document.getElementById('list');
  element_list.replaceChildren();
  let element_list2 = document.getElementById('list');
  rolls.forEach((item) => {
    let new_li = document.createElement('li');
    new_li.innerText = item;

    element_list2.appendChild(new_li);
  });
  total = rolls.reduce((a,b) => a+b, 0);
  let element_total = document.getElementById('total');
  element_total.innerText = total;
  if (total == 11) {
    let element_info = document.getElementById('info');
    element_info.innerText = 'You win!';
    element_info.style.color = '#0b4f10';
    audioW.currentTime = 0;
    audioW.play();
    document.getElementById("button_roll").disabled = true;
    document.getElementById("button_remove").disabled = true;
  } else if (total < 11) {
    let element_info2 = document.getElementById('info');
    element_info2.innerText = 'Keep playing!';
    element_info2.style.color = '#000';
    document.getElementById("button_roll").disabled = false;
  } else {
    let element_info3 = document.getElementById('info');
    element_info3.innerText = 'You lost!';
    element_info3.style.color = '#ff6666';
    audioL.currentTime = 0;
    audioL.play();
    document.getElementById("button_roll").disabled = true;
  }
}

function randomInt(n) {
  // Return a random number from in [0, n[
  return Math.floor(Math.random()*n);
}

function randomMember(arr) {
  // Return a random member of the array
  return arr[randomInt(arr.length)]
}


dice = [1, 2, 3, 4, 5, 6];
rolls = [];


document.getElementById('button_roll').addEventListener('click', (event) => {
  rolls.push(randomMember(dice));
  do_the_rolls();
  audio.currentTime = 0;
  audio.play();
});

document.getElementById('button_remove').addEventListener('click', (event) => {
  rolls.pop();
  do_the_rolls();
  audioO.currentTime = 0;
  audioO.play();
});

document.getElementById('button_restart').addEventListener('click', (event) => {
  rolls = [];
  do_the_rolls();
  document.getElementById("button_remove").disabled = false;
});

