// app.js
document.addEventListener('DOMContentLoaded', function () {
  const start = document.getElementById('start');
  const pause = document.getElementById('pause');
  const timeHolder = document.querySelector('#progressTime');
  const gridContainer = document.getElementById('gridContainer');

  let game = {
      timeChecker: 59,
      startClickedMultipleTimes: 0,
      gameIsPaused: true,
      score: 0,
      timer: null,
      randomFrogInterval: null,
  };

  start.addEventListener('click', startGame);
  pause.addEventListener('click', pauseGame);

  function startGame() {
      game.gameIsPaused = false;

      if (game.startClickedMultipleTimes === 0) {
          initializeGame();
          time(game.timeChecker);
      }

      game.startClickedMultipleTimes++;
  }

  function initializeGame() {
      createGridItems();
      game.randomFrogInterval = setInterval(frogRotation, 1000);
  }

  function pauseGame() {
      game.gameIsPaused = true;
      game.startClickedMultipleTimes = 0;
      clearInterval(game.timer);
      clearInterval(game.randomFrogInterval);
  }

  function time(seconds) {
      function countdown() {
          if (seconds >= 0 && !game.gameIsPaused) {
              timeHolder.innerText = seconds;
              seconds--;
              game.timeChecker--;
          } else {
              endGame();
          }
      }

      game.timer = setInterval(countdown, 1000);
  }

  function endGame() {
      game.gameIsPaused = true;
      clearInterval(game.timer);
      clearInterval(game.randomFrogInterval);
      timeHolder.innerText = 'time is up!!';
  }

  function createGridItems() {
      for (let i = 1; i <= 9; i++) {
          const gridItem = document.createElement('div');
          gridItem.classList.add('grid-item');
          gridItem.setAttribute('data-id', i);
          gridContainer.appendChild(gridItem);
      }

      gridContainer.addEventListener('click', function (event) {
        const clickedItem = event.target.closest('.grid-item');
        const hasFrog = clickedItem && clickedItem.querySelector('img');
    
        if (hasFrog) {
            upgradeScore();
            clickedItem.innerHTML = '';
        }
    });
    
  }

  function upgradeScore() {
      game.score++;
      document.querySelector('#score').innerText = game.score;
  }

  function frogRotation() {
      if (!game.gameIsPaused) {
          let random = rand(1, 9);

          while (random === getLastRandom()) {
              random = rand(1, 9);
          }

          recordLastRandom(random);

          const choosedGridItem = document.querySelector(`[data-id='${random}']`);
          const img = document.createElement('img');
          img.setAttribute('src', 'frog.png');
          img.addEventListener('click', upgradeScore);
          choosedGridItem.appendChild(img);

          setTimeout(() => {
              choosedGridItem.innerHTML = '';
          }, 1000);
      }
  }

  function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getLastRandom() {
      return game.lastRandom || 0;
  }

  function recordLastRandom(random) {
      game.lastRandom = random;
  }
});
