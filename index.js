//todo-------------------------------------------- Translation application!
const setting = document.querySelector('.setting');


setting.addEventListener('click', () => {
   setting.classList.toggle('ru');
   if (setting.classList.contains('ru')) {
      name.placeholder = '[Введите ваше имя]';
      getQuotes();
   } else {
      name.placeholder = '[Enter name]';
      getQuotes();
   }
});

//todo-------------------------------------------- Creating a clock!
const time = document.querySelector('.time');
const toDay = document.querySelector('date');
let randomNum;

const showTime = function () {
   setInterval(() => {
      const date = new Date();
      const onlyTime = date.toLocaleTimeString();

      time.textContent = onlyTime;
      showDate();
      getTimeOfDay();

   }, 1000);

};
showTime();

//todo-------------------------------------------- Creating a date!
const showDate = function () {
   const date = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric', };
   const onlyDateEn = date.toLocaleDateString('en-EN', options);
   const onlyDateRu = date.toLocaleDateString('ru-RU', options);

   if (setting.classList.contains('ru')) {
      toDay.textContent = onlyDateRu;
   } else {
      toDay.textContent = onlyDateEn;

   }
}
showDate();

//todo-------------------------------------------- Creating a greeting!
const greeting = document.querySelector('.greeting');
const greetPhraseEn = ['Good morning,', 'Good afternoon,', 'Good evening,', 'Good night,',];
const greetPhraseRu = ['Доброе утро,', 'Добрый день,', 'Добрый вечер,', 'Доброй ночи,',];
const greetingTranslation = {
   'en': greetPhraseEn,
   'ru': greetPhraseRu,
};
const getTimeOfDay = function () {
   const date = new Date();
   const hours = date.getHours();
   if (setting.classList.contains('ru')) {
      if (hours >= 6 && hours < 12) {
         return greeting.textContent = greetingTranslation.ru[0];
      } else if (hours >= 12 && hours < 18) {
         return greeting.textContent = greetingTranslation.ru[1];
      } else if (hours >= 18 && hours < 24) {
         return greeting.textContent = greetingTranslation.ru[2];
      } else {
         return greeting.textContent = greetingTranslation.ru[3];
      }
   } else {
      if (hours >= 6 && hours < 12) {
         return greeting.textContent = greetingTranslation.en[0];
      } else if (hours >= 12 && hours < 18) {
         return greeting.textContent = greetingTranslation.en[1];
      } else if (hours >= 18 && hours < 24) {
         return greeting.textContent = greetingTranslation.en[2];
      } else {
         return greeting.textContent = greetingTranslation.en[3];
      }
   }
};

//todo-------------------------------------------- Saving name in a localStorage!
const name = document.querySelector('.name');

//! Перед перезагрузкой / закрытием  сохраняем данные
function setLocalStorage() {
   localStorage.setItem('name', name.value);
   localStorage.setItem('city', city.value);
   localStorage.setItem('volum', volumeSlider.value)
};
window.addEventListener('beforeunload', setLocalStorage);
//! Перед загрузкой страницы получаем данные
function getLocalStorage() {
   if (localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
   };
   if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      getWeather();
   };
   if (localStorage.getItem('volum')) {
      volumeSlider.value = localStorage.getItem('volum');
      setVolume()
   };
};
window.addEventListener('load', getLocalStorage);

//todo-------------------------------------------- Creating an image replacement!
const body = document.querySelector('body');

const getRandom = function (min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   randomNum = Math.floor(Math.random() * (max - min)) + min;
   return Math.floor(Math.random() * (max - min)) + min;
};


const setBg = function () {

   let timeOfDay = getTimeOfDay();
   let bgNum = getRandom(1, 21).toString().padStart(2, '0');
   const img = new Image();

   if (timeOfDay === greetPhraseEn[0]) {
      img.src = `https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/morning/${bgNum}.jpg`;
      img.onload = () => {
         body.style.backgroundImage = `url('https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/morning/${bgNum}.jpg')`;
      };

   } else if (timeOfDay === greetPhraseEn[1]) {
      img.src = `https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/afternoon/${bgNum}.jpg`;
      img.onload = () => {
         body.style.backgroundImage = `url('https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/afternoon/${bgNum}.jpg')`;
      };

   } else if (timeOfDay === greetPhraseEn[2]) {
      img.src = `https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/evening/${bgNum}.jpg`;
      img.onload = () => {
         body.style.backgroundImage = `url('https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/evening/${bgNum}.jpg')`;
      };

   } else if (timeOfDay === greetPhraseEn[3]) {
      img.src = `https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/night/${bgNum}.jpg`;
      img.onload = () => {
         body.style.backgroundImage = `url('https://raw.githubusercontent.com/MikalaiF/stage1-tasks/eb5be2f6c706462d16f038915b8ccbd34f17e56d/images/night/${bgNum}.jpg')`;
      };
   };

};
//-------Срабатывает функция , 1 раз.
setBg();
//-------А здесь уже проверяем каждую секунду минуты и секунды и меняем в 00:00, почему то не получилось
//засунуть в showTime.
setInterval(() => {
   const date = new Date();
   const minutes = date.getMinutes();
   const seconds = date.getSeconds();
   if (minutes === 0 && seconds === 0) {
      setBg();
   }
}, 1000);

//todo-------------------------------------------- Creating a slider img!
const nextSlider = document.querySelector('.slide-next');
const prevSlider = document.querySelector('.slide-prev');

function getSliderNext() {
   randomNum++;
   if (randomNum === 20) {
      randomNum = 1;
   };
   setBg();
};

function getSliderPrev() {
   randomNum--;
   if (randomNum === 1) {
      randomNum = 20;
   };
   setBg();
};

nextSlider.addEventListener('click', getSliderNext);
prevSlider.addEventListener('click', getSliderPrev);

//todo-------------------------------------------- Creating a weather widget!
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.weather-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const err = document.querySelector(".weather-error");

async function getWeather() {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=1dcce506d8aa69540fdf27e15ccff197&units=metric`;
   const res = await fetch(url);
   const data = await res.json();


   try {
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherWind.textContent = `Wind speed: ${data.wind.speed.toFixed()} m/s`;

   } catch (error) {
      err.textContent = 'city entered incorrectly'
   }

};
getWeather();

function setCity(event) {
   if (event.code === 'Enter') {
      err.textContent = ''
      getWeather();
      city.blur();
   };
};

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//todo-------------------------------------------- Creating a quote of the Day!
const btnQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


async function getQuotes() {
   if (setting.classList.contains('ru')) {
      const quotesRu = 'assets/dataRu.json';
      const res = await fetch(quotesRu);
      const data = await res.json();

      let randomQuote = getRandom(0, 30);
      quote.textContent = data[randomQuote].text;
      author.textContent = data[randomQuote].author
   } else {
      const quotes = 'assets/data.json';
      const res = await fetch(quotes);
      const data = await res.json();

      let randomQuote = getRandom(0, 160);
      quote.textContent = data[randomQuote].text;
      author.textContent = data[randomQuote].author
   }

}
getQuotes();

const qqq = btnQuote.addEventListener('click', getQuotes);

//todo-------------------------------------------- Creating a music player!
//-------play list!


let isPlay = false;
const mute = document.querySelector('.img_volume');
const player = document.querySelector('.player');
const playerControls = document.querySelector('.player-controls');
const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playList = document.querySelector('.play-list');
const audio = document.querySelector('.audio');
const title = document.querySelector('.title_song');
const progressContainer = document.querySelector('.player_progress_container');
const progress = document.querySelector('.progress');


const songs = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];

let songsIndex = 0;

function getSong(song) {
   //audio.src = `assets/sounds/${song}.mp3`;
   audio.src = playListPlayer[songsIndex].src;
   title.textContent = song;

};
getSong(songs[songsIndex]);

function playAudio() {
   player.classList.add('playS');

   audio.play()
};

function pauseAudio() {
   player.classList.remove('playS');

   audio.pause();
};

play.addEventListener('click', () => {

   if (player.classList.contains('playS')) {
      pauseAudio();
      play.classList.remove('pause');
      play.classList.add('play');
   } else {
      playAudio();
      play.classList.remove('play');
      play.classList.add('pause');
   };
});

//-------next song!
function nextSong() {
   songsIndex++;
   if (songsIndex > songs.length - 1) {
      songsIndex = 0;
   }
   getSong(songs[songsIndex]);
   playAudio();
   play.classList.add('pause');
};

playNext.addEventListener('click', nextSong);

//-------prev song!
function prevSong() {
   songsIndex--;
   if (songsIndex < 0) {
      songsIndex = songs.length - 1
   };
   getSong(songs[songsIndex]);
   playAudio();
   play.classList.add('pause');
};

playPrev.addEventListener('click', prevSong);


playListPlayer.forEach(item => {
   const li = document.createElement('li');
   li.classList.add('play-item');
   li.textContent = item.title;
   playList.append(li)

})


import playListPlayer from './playListPlayer.js';


audio.addEventListener('ended', nextSong);

const playItem = document.querySelectorAll('.play-item');


//---progress bar
const current_time = document.querySelector('.current-time')
const totalDuration = document.querySelector('.total-duration')
function updateProgress(e) {
   const { duration, currentTime } = e.srcElement
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`

   if (currentTime < 10) {
      current_time.textContent = `0${Math.floor(currentTime)} / `;
   } else {
      current_time.textContent = `${Math.floor(currentTime)} / `;
   }

   if (duration < 60) {
      totalDuration.textContent = `0:${Math.floor(duration)} s`;
   } else if (duration > 60) {
      totalDuration.textContent = `${Math.floor(duration)} s`;
   }

}

audio.addEventListener('timeupdate', updateProgress)


//---set progress
function setProgress(event) {
   const width = this.clientWidth;
   const clickX = event.offsetX;
   const duration = audio.duration;
   audio.currentTime = (clickX / width) * duration;

};

progressContainer.addEventListener('click', setProgress);

//---sound
const volumeSlider = document.querySelector('.volume');
function setVolume() {
   audio.volume = volumeSlider.value / 100;

}
volumeSlider.addEventListener('click', setVolume);

mute.addEventListener('click', () => {
   mute.classList.toggle('mute');
   if (mute.classList.contains('mute')) {
      audio.volume = volumeSlider.value = 0;
   } else {

      setVolume()
   }
});



console.log(`1. Часы и календарь +15\n2.Приветсвие +10\n3.Смена фонового изображения +20
\n4.Виджет погоды +15\n5.Виджет цитата дня +10
\n6.Аудиоплеер +12(Не применяется стиль к треку который проигрывается)\n7.Продвинутый аудиоплеер +20
(mute работает, но ползунок не возращается на место, вроде не учитывается этот фактор)\n
8.Перевод приложения на два языка +9 (погода и настройки не переводятся(настроек нет как таковых))\n
9.Получение фонового изображения(Не понимаю о чем речь, пунк 3 выполнил полностью)\n
10.Настройки приложения +3(смена языка)\n11.Дополнительный функционал +0\nScore: 114`)