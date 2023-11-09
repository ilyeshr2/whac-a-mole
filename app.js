const start=document.getElementById('start')
const pause=document.getElementById('pause')




let timeChecker=59
let startClickedMultipleTimes=0
let gameIsPaused=true


start.addEventListener('click',startGame)
pause.addEventListener('click',pauseGame) 
let timeHolder = document.querySelector('#progressTime');
let timer;

function time(seconds){
  function countdown() {
      if (seconds >= 0) {
          timeHolder.innerText = seconds;
          seconds--;
          timeChecker--
      } else {
        gameIsPaused=true
          clearInterval(timer);
          timeHolder.innerText = 'time is up!!';
      }
  }

  timer = setInterval(countdown, 1000);
}

function startGame(){
  gameIsPaused=false
  if(startClickedMultipleTimes==0){
  let timeAtStart=timeChecker
  time(timeAtStart);
  frogRandomDisplay()
}
  startClickedMultipleTimes++
}

function pauseGame(){
  gameIsPaused=true
  startClickedMultipleTimes=0
  clearInterval(timer);
}



function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function frogRandomDisplay(){
  let randArr=[]
  let randomFrogInterval=setInterval(frogRotation, 1000);
  function frogRotation(){
    if(gameIsPaused==false){
      let random=rand(1,9)
      randArr.push(random)
      if(randArr.length==2){
        
        while(randArr[0]==randArr[1]){
          console.log(randArr)
          random=rand(1,9)
          randArr[1]=random
        }
        randArr=[]
      }
      console.log(random)
      let choosedGridItem=document.querySelector([`[data-id='${random}']`])
      
      let img = document.createElement('img');
      img.setAttribute('src', 'frog.png');
      choosedGridItem.appendChild(img);
      setTimeout(()=>{choosedGridItem.innerHTML=''},1000)
      
      
    }else clearInterval(randomFrogInterval)
  }
}


function gameStarted(){
  if(gameIsPaused==false){

  }
}
