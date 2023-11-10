const start=document.getElementById('start')
const pause=document.getElementById('pause')
const timeHolder = document.querySelector('#progressTime');

start.addEventListener('click',startGame)
pause.addEventListener('click',pauseGame)



let timeChecker=59
let startClickedMultipleTimes=0
let gameIsPaused=true
let score=0

let timer;


function startGame(){
  gameIsPaused=false
  if(startClickedMultipleTimes==0){
  let timeAtStart=timeChecker
  frogRandomDisplay()
  time(timeAtStart);
  
}
  startClickedMultipleTimes++
}

function pauseGame(){
  gameIsPaused=true
  startClickedMultipleTimes=0
  clearInterval(timer);
}

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

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function upgradeScore(){
  const scoreBoard=document.querySelector('#score')
  score++
  scoreBoard.innerText=score
}

function frogRandomDisplay(){
  let randArr=[]
  let n=0
  let randomFrogInterval=setInterval(frogRotation, 1000);
  function frogRotation(){
    if(gameIsPaused==false){
      let random=rand(1,9)
      randArr.push(random)
      
      if(randArr.length>=2){
        while(randArr[n-1]==randArr[n]){
          //console.log(randArr)
          random=rand(1,9)
          randArr[n]=random
        }
      }n++
      //console.log(random)
      let choosedGridItem=document.querySelector([`[data-id='${random}']`])
      
      let img = document.createElement('img');
      img.setAttribute('src', 'frog.png');
      img.setAttribute('data-id', `${random}`);
      img.addEventListener('click',upgradeScore)
      choosedGridItem.appendChild(img);
      setTimeout(()=>{choosedGridItem.innerHTML=''},1000)
      
      
    }else{
      clearInterval(randomFrogInterval)
      //let imgAtPause=document.querySelector('img')
      //let itemDataId=imgAtPause.getAttribute('data-id')
      //let pausedGridItem = document.querySelector([`[data-id='${itemDataId}']`])
      //setTimeout(()=>{pausedGridItem.innerHTML='<img src="frog.png">'},1000)
      //console.log(pausedGridItem)
    }
  }
}

