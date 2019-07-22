//https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=i3v7ix2jcm1k7a8nr6x4xin2a8filisaqhjl400uxb5y8nvg0
var url = 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=i3v7ix2jcm1k7a8nr6x4xin2a8filisaqhjl400uxb5y8nvg0';
var canvas = document.querySelector('canvas');
var lines = document.querySelector('.lines');
var welcome = document.querySelector('.welcome');
var word = document.querySelector('.pre-word');
var again = document.querySelector('.again');
var alphabet = document.querySelector('.alphabet');
var box = document.querySelector('.box');
var modal = document.querySelector('.modal');
var outcome = document.getElementById('outcome');
var score = document.getElementById('score');
var button = document.querySelector('.button');
var answer = document.getElementById('answer');

var tries = 9;
var ans = 'game';

ans = ans.toUpperCase();
var ansArr = [];
ansArr.length = ans.length;

var visited = [];

canvas.height = 402;
var c = canvas.getContext('2d');
c.strokeStyle = 'white';
c.fillStyle = 'white';

// function setup() {
//   loadJSON('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=i3v7ix2jcm1k7a8nr6x4xin2a8filisaqhjl400uxb5y8nvg0', gotData);
// }
//
// function gotData(data) {
//   println(data);
// }
//
// setup();

function getWord() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=i3v7ix2jcm1k7a8nr6x4xin2a8filisaqhjl400uxb5y8nvg0', true);
  request.onload = function () {
    console.log('onload');

    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      ans = data.word;
      console.log(ans);
    } else {
      console.log('error');
    }
  }

  request.send();
}

function start() {
  tries = 9;
  ans = ans.toUpperCase();
  ansArr = [];
  ansArr.length = ans.length;

  visited = [];
  display();
  underlines(ans.length);
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawBase();
}

function display() {
  welcome.style.display = 'none';
  modal.style.display = 'none';
  box.style.zIndex = '999';
}

function underlines(wordLnth) {
  word.innerHTML = '';
  lines.innerHTML = '';
  for (var i = 0; i < wordLnth; i++) {
    lines.innerHTML += '_';
  }
}

function resetColors() {
  for (var i = 0; i < visited.length; i++) {
    var id = document.getElementById(visited[i]);
    id.style.color = '#fff';
  }
}

function checkLetter(letter) {
  var id = document.getElementById(letter);
  id.style.color = '#ccc';
  for (var i = 0; i < visited.length; i++) {
    if (visited[i] === letter) {
      return;
    }
  }

  visited.push(letter);

  correct = false;
  for (var i = 0; i < ans.length; i++) {
    if (letter === ans[i]) {
      ansArr[i] = letter;
      correct = true;
    }
  }

  if (correct) {
    print();
  }
  else {
    tries--;
    drawPart();
    console.log('wrong choice');
  }
}

function lose() {
  getWord();
  console.log('you lose');
  modal.style.display = 'block';
  outcome.innerHTML = 'Game Over.';
  answer.innerHTML = `Word: ${ans}`;
  score.innerHTML = '';
  resetColors();
}

function win() {
  getWord();
  console.log('you win');
  modal.style.display = 'block';
  outcome.innerHTML = 'You Win!';
  answer.innerHTML = `Word: ${ans}`;
  score.innerHTML = `Your Score: ${tries}`;
  resetColors();
}

function print() {
  word.innerHTML = '';
  var won = true;
  for (var i = 0; i < ansArr.length; i++) {
    if (ansArr[i] === undefined) {
      word.innerHTML += ' ';
      won = false;
      console.log('false');
    }
    else {
    word.innerHTML += ansArr[i];
    }
  }

  if (won === true) {
    win();
  }
}

function drawBase() {
  c.beginPath();
  c.moveTo(0, 350);
  c.lineTo(120, 350);
  c.stroke();

  c.beginPath();
  c.moveTo(60, 350);
  c.lineTo(60, 20);
  c.stroke();

  c.lineTo(200, 20);
  c.stroke();

  c.lineTo(200, 80);
  c.stroke();
}

function drawPart() {
  switch (tries) {
    case 8:
      c.beginPath();
      c.arc(200, 110, 30, 0, Math.PI * 2, false);
      c.stroke();
      break;

    case 7:
      c.beginPath();
      c.moveTo(200, 140);
      c.lineTo(200, 230);
      c.stroke();
      break;

    case 6:
      c.beginPath();
      c.moveTo(200, 185);
      c.lineTo(250, 150);
      c.stroke();
      break;

    case 5:
      c.beginPath();
      c.moveTo(200, 185);
      c.lineTo(150, 150);
      c.stroke();
      break;

    case 4:
      c.beginPath();
      c.moveTo(200, 230);
      c.lineTo(240, 290);
      c.stroke();
      break;

    case 3:
      c.beginPath();
      c.moveTo(200, 230);
      c.lineTo(160, 290);
      c.stroke();
      break;

    case 2:
      c.beginPath();
      c.arc(187, 105, 1.5, 0, Math.PI * 2, false);
      c.fill();
      c.stroke();
      break;

    case 1:
      c.beginPath();
      c.arc(210, 105, 1.5, 0, Math.PI * 2, false);
      c.fill();
      c.stroke();
      break;

    case 0:
      c.beginPath();
      c.arc(198, 115, 10, 2.5, 7, true);
      c.stroke();
      lose();
      break;
  }
}

getWord();
