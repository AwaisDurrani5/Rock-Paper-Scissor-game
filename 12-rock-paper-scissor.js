let score =JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};
  /*
  if (!score){
    score={
      Wins: 0,
      Losses: 0,
      Ties: 0
    };
  }
  */

updateScoreElement();

console.log(JSON.parse(localStorage.getItem('score')));

let isAutoPlaying = false;
let intervalId ;

//const autoPlay = () => {

//};
function autoPlay(){
  if (!isAutoPlaying){

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }             
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  }else if (event.key === 'p'){
    playGame('Paper');
    
  } else if (event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){

  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'Scissors'){

      
    if(computerMove === 'Rock'){
      result = 'You Losse.';
    } else if (computerMove === 'Paper'){
      result = 'You Win.';
    } else if (computerMove === 'Scissors'){
      result = 'Tie.';
    }

  } else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){       
      result = 'You Win.';
    } else if (computerMove === 'Paper'){
      result = 'Tie.';
    } else if (computerMove === 'Scissors'){
      result = 'You Losse.';
    }

  } else if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
      result = 'Tie.';
    } else if (computerMove === 'Paper'){
      result = 'You Losse.';
    } else if (computerMove === 'Scissors'){
      result = 'You Win.';
    }

  }
  if (result === 'You Win.'){
    score.Wins += 1;
  }else if (result === 'You Losse.'){
    score.Losses += 1;
  
  }else if (result === 'Tie.'){
    score.Ties +=1;
  }

  localStorage.setItem('score' , JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
  .innerHTML = result;

  document.querySelector('.js-moves')
  .innerHTML = `You 
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer;`


}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins} , Losses: ${score.Losses} , Tie: ${score.Ties}` ;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoPlay('computerMove');
})




let computerMove = '';
function pickComputerMove(){
  const randomNumber = Math.random();
  
  if (randomNumber >= 0 && randomNumber < 1/3 ){
    computerMove = 'Rock';  
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissors';
  }   
  return computerMove;
} 