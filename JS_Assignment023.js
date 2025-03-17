let player1;
const items = ['scissors', 'paper', 'rock', 'lizard', 'spock'];
const player1Board = document.querySelector('.player._1');
const player2Board = document.querySelector('.player._2');

const gamePanel = document.querySelector('.gamePanel');
const scorePlayer1 = document.querySelector('.scorePlayer._1');
const scorePlayer2 = document.querySelector('.scorePlayer._2');
const choices = Array.from(document.querySelectorAll('.gameOn ul > li'));




function init() {
  player1Board.classList.add('turn');
  player1Board.style.setProperty("--imgChar", "url(./images/untilSlect.webp)");
  player2Board.style.setProperty("--imgChar", "url(./images/untilSlect.webp)");
  player1 = '';
  scorePlayer1.classList.remove('scoreUp');
  document.querySelector('.gameOn ul > li.random').classList.remove('random')
  scorePlayer2.classList.remove('scoreUp');
}

init()

function reStart() {
  setTimeout(() => {
    location.reload();
  }, 3000);
}


function UserWin() {
  document.querySelector('.gameOn').classList.add('hide');
  gamePanel.classList.add('userWin');
  reStart()
}

function betterLuckNextTime() {
  document.querySelector('.gameOn').classList.add('hide');
  gamePanel.classList.add('userLost');
  reStart()
}

function getStart(ele) {
  player1Board.classList.add('turn');
  gamePanel.classList.remove('animate');
  gamePanel.classList.remove('show');
  ele.style.backgroundImage = 'url(./images/load1.gif)';
  setTimeout(() => {
    ele.classList.add('hide');
    document.querySelector('.gameOn.hide').classList.remove('hide');
  }, 1500);

}

function userSelect(ele) {

  player1 = ele.classList[ele.classList.length - 1]
  console.log(player1);

  player1Board.classList.remove('turn');
  player1Board.style.setProperty("--imgChar", `url(./images/${player1}.gif)`)
  player2Board.classList.add('turn');
  computerTime()
}
// const choices = document.querySelectorAll('.gameOn ul > li');
function computerTime() {
  let randomSelect = 20 + Math.floor(Math.random() * 5);

  console.log(randomSelect);
  let player2 = items[randomSelect % 20];

  let i = 0;

  function addClassRandom() {
    // if (i <= ~~(randomSelect / 2)) {
    choices.at((i) - 1)?.classList.remove('random');
    choices.at((i)).classList.add('random');
    // }
    i++;
  }
  const interVal = setInterval(() => {
    addClassRandom()
    console.log(i, (randomSelect % 20));

    if (i > (randomSelect % 20)) {
      clearInterval(interVal);
      player2Board.classList.remove('turn');
      player2Board.style.setProperty("--imgChar", `url(./images/${player2}.gif)`);
      isUserWin(rpsls(player1, player2));
    }
  }, 200)
  // choices.at((i % 5)).classList.add('random');
  console.log(player1, player2);


}

function isUserWin(isWin) {
  const ClashDisplay = document.querySelector('.isWin.hide');
  ClashDisplay.classList.remove('hide');

  setTimeout(() => {
    ClashDisplay.classList.add('hide');
  }, 1000);

  console.log(isWin);
  console.log(scorePlayer1.firstElementChild.textContent);
  console.log(scorePlayer2.firstElementChild);

  setTimeout(() => {
    if (isWin == 'Draw!') {
      scorePlayer1.classList.add('scoreUp')
      scorePlayer2.classList.add('scoreUp')
    } else if (isWin == 'Player 1 Won!') {
      scorePlayer1.classList.add('scoreUp');
      scorePlayer1.firstElementChild.textContent++

    } else if (isWin == 'Player 2 Won!') {
      scorePlayer2.firstElementChild.textContent++
      scorePlayer2.classList.add('scoreUp')
    }
    setTimeout(() => {

      if (scorePlayer1.firstElementChild.textContent > 5) {
        UserWin()
      } else if (scorePlayer2.firstElementChild.textContent > 5) {
        betterLuckNextTime()
        // UserWin()
      } else init()
    }, 2000);
  }, 2000);

}

function rpsls(pl1, pl2) {
  if (pl1 == pl2) return 'Draw!';
  return (items[(items.indexOf(pl1) + 1) % 5] == pl2 || items[(items.indexOf(pl1) + 3) % 5] == pl2) ? 'Player 1 Won!' : 'Player 2 Won!';

}


