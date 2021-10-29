'use strict';

//Problems
//1. greetings - change greetings by time
//2. get name and save it to local storage
//3. get the date
//4. get weather api
//5. get time
//6. get random photos displayed
//7. get random quotes and author displayed
//8. todo list (add item, remove item)

const greet = document.querySelector('.greeting');
const userName = document.querySelector('#heading input');
const setName = document.querySelector('.name');
const editName = document.querySelector('.modify');
const today = new Date();
const date = document.querySelector('#left .date');

//1
function greetings() {
  let time = today.getHours();
  if (time >= 18) {
    greet.innerHTML = `Good Evening 🌙`;
  } else if (time >= 12) {
    greet.innerHTML = `Good Afternoon 🥳`;
  } else if (time > 0 && time < 4) {
    greet.innerHTML = `Balju Balju 🆘`;
  } else {
    greet.innerHTML = `Good Morning 🌈`;
  }
}
greetings();

//2
userName.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    userName.classList.toggle('hidden');
    setName.innerHTML = `${userName.value}`;
    localStorage.setItem('username', userName.value);
    setName.classList.toggle('hidden');
    editName.classList.toggle('hidden');
  }
});

//check if there is username saved
const savedUsername = localStorage.getItem('username');
if (savedUsername !== null) {
  setName.classList.toggle('hidden');
  userName.classList.toggle('hidden');
  editName.classList.toggle('hidden');
  setName.innerHTML = savedUsername;
}

//edit name
editName.addEventListener('click', function () {
  localStorage.removeItem('username');
  setName.classList.toggle('hidden');
  userName.classList.toggle('hidden');
  editName.classList.toggle('hidden');
  userName.value = '';
});

//3

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

date.innerHTML = `${days[today.getDay()]} ${
  monthNames[today.getMonth()]
} ${today.getDate()}, ${today.getFullYear()}`;

//4 - weather api
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('.weather');
      const location = document.querySelector('.location');
      weather.innerText = `${Math.round(data.main.temp)}°C ${
        data.weather[0].main
      }`;
      location.innerText = `${data.name}`;
    });
}
function onGeoError() {
  console.log('Allow location');
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const API_KEY = '230638eecf67cba9f64dcabe623a6c05';

//5
function getClock() {
  const date = new Date();
  const clock = document.querySelector('.clock');
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock.innerText = `${hours}:${minutes}:${seconds} ${
    hours >= 12 ? 'PM' : 'AM'
  }`;
}

setInterval(getClock, 1000);

//6
const images = [
  {
    url: 'images/choon_01.png',
  },
  {
    url: 'images/choon_02.png',
  },
  {
    url: 'images/choon_03.png',
  },
  {
    url: 'images/choon_04.png',
  },
  {
    url: 'https://64.media.tumblr.com/09e5dc215ed9e09a0a96094e5255720e/7770f13ba34dd3f9-79/s1280x1920/3f6b0eed44af414c3205323209212905b3d31c16.gifv',
  },
];

const quoteImages = document.querySelector('.quotes-images');
const randomNumber = Math.floor(Math.random() * images.length);
quoteImages.src = `${images[randomNumber].url}`;

//6
const quotes = [
  {
    id: 0,
    quotes:
      '“ 파도가 부푼다 보채는 빛 속에서 어둠 속에서 ”',
    author: '김연덕',
  },
  {
    id: 1,
    quotes:
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams. but.. there are just part-time bottoms”",
    author: 'Dr. Seuss maybe',
  },
  {
    id: 2,
    quotes:
      '“Mesmo a ausência dela é uma coisa que está comigo.”',
    author: 'Fernando Pessoa',
  },
  {
    id: 3,
    quotes:
      "“못생겨서 정이 안 가. 무슨 자신감으로 열심히 사냐?”",
    author: "fxxkin' rad",
  },
  {
    id: 4,
    quotes:
      '“니 척골에 야마리 뭐 빤 회충이 생심코 여명을 불사한다. 머리맡 무방비할 때마다 무뢰배 들쳐 업고 싸질러 줄게, 사랑.”',
    author: 'Gad, Gas, Gag',
  },
  {
    id: 5,
    quotes: '“You can choose when you have a choice”',
    author: 'Haneul Seo',
  },
];

const quote = document.querySelector('.quotes');
const author = document.querySelector('.author');

function displayQuote() {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  quote.innerHTML = `${quotes[randomNumber].quotes}`;
  author.innerHTML = `― ${quotes[randomNumber].author}`;
}

displayQuote();

//8
const newTaskDaily = document.querySelector('.todolist-daily--box .js_todo');
const newTaskDailyInput = document.querySelector('.todolist-daily--box input');
const todoTopDaily = document.querySelector('.todolist-daily--box .top');
let arrTodo = [];
const TODOS_KEY = 'todos';

const newTaskWeekly = document.querySelector('.todolist-weekly--box .js_todo');
const newTaskWeeklyInput = document.querySelector(
  '.todolist-weekly--box input'
);
const todoTopWeekly = document.querySelector('.todolist-weekly--box .top');
let arrTodoWeekly = [];
const TODOS_KEY_WEEKLY = 'weeklytodos';

//Daily Todo
function saveToDos() {
  localStorage.setItem('todos', JSON.stringify(arrTodo));
}

function deleteToDo(event) {
  const ulDelete = event.target.parentElement.parentNode;
  ulDelete.remove();
  arrTodo = arrTodo.filter((toDo) => toDo.id !== parseInt(ulDelete.id));
  saveToDos();
}
function paintTodo(newTodo) {
  const ul = document.createElement('ul');
  ul.id = newTodo.id;
  const liItem = document.createElement('li');
  liItem.classList.add('item');
  const liDelete = document.createElement('li');
  liDelete.classList.add('delete');
  liItem.innerText = newTodo.text;
  liDelete.innerHTML = `<i class="far fa-trash-alt"></i>`;
  ul.appendChild(liItem);
  ul.appendChild(liDelete);
  todoTopDaily.appendChild(ul);
  liDelete.addEventListener('click', deleteToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
}

newTaskDaily.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  arrTodo = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

//Weekly Todo

function saveToDosW() {
  localStorage.setItem('weeklytodos', JSON.stringify(arrTodoWeekly));
}

function deleteToDoW(event) {
  const ulDelete = event.target.parentElement.parentNode;
  ulDelete.remove();
  arrTodoWeekly = arrTodoWeekly.filter(
    (toDo) => toDo.id !== parseInt(ulDelete.id)
  );
  saveToDosW();
}
function paintTodoW(newTodo) {
  const ul = document.createElement('ul');
  ul.id = newTodo.id;
  const liItem = document.createElement('li');
  liItem.classList.add('item');
  const liDelete = document.createElement('li');
  liDelete.classList.add('delete');
  liItem.innerText = newTodo.text;
  liDelete.innerHTML = `<i class="far fa-trash-alt"></i>`;
  ul.appendChild(liItem);
  ul.appendChild(liDelete);
  todoTopWeekly.appendChild(ul);
  liDelete.addEventListener('click', deleteToDoW);
}

function handleToDoSubmitW(event) {
  event.preventDefault();
  const newTodo = newTaskWeeklyInput.value;
  newTaskWeeklyInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  arrTodoWeekly.push(newTodoObj);
  paintTodoW(newTodoObj);
  saveToDosW();
}

newTaskWeekly.addEventListener('submit', handleToDoSubmitW);

const savedToDosW = localStorage.getItem(TODOS_KEY_WEEKLY);

if (savedToDosW !== null) {
  const parsedToDos = JSON.parse(savedToDosW);
  arrTodoWeekly = parsedToDos;
  parsedToDos.forEach(paintTodoW);
}

// Music player
const musicPlayer = document.querySelector('.music');
const playMusic = document.querySelector('.music li:first-child');
const stopMusic = document.querySelector('.music li:nth-child(2)');

musicPlayer.addEventListener('click', function () {
  const audio = document.getElementById('audio');
  if (audio.paused) {
    audio.play();
    playMusic.classList.toggle('hidden');
    stopMusic.classList.toggle('hidden');
  } else {
    audio.pause();
    playMusic.classList.toggle('hidden');
    stopMusic.classList.toggle('hidden');
  }
});

musicPlayer.addEventListener(
  'ended',
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);
