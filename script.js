const playBtn = document.querySelector("button");
const scoreP1 = document.getElementById('score-P1');
const scoreP2 = document.getElementById('score-P2');
const rnd = document.getElementById('rd');
let div = document.getElementById('parent');
let winnerchecked = false;
const Winnerarray = [['0','1','2'],['0','3','6'],['0','4','8'],['1','4','7'],['2','5','8'],['3','4','5'],['6','7','8'],['2','4','6']];
let round = 1;
let children = div.children;
let drawchecked = false;
let counter = 0;

console.log(children)
console.log(div)
let Player1 ={
    score : 0,
    activePlayer: true,
    Symbol:'X',
    chosenNum:[]
}
let Player2 ={
    score: 0,
    activePlayer: false,
    Symbol:'O',
    chosenNum:[]
}
/*
* When i click on a div => Change the color
* => give the otherplayer the next move 
*
*/

function Played(e){
    console.log(e.target.id);
    let bg = document.getElementById(e.target.id);
    if(Player1.activePlayer === true && bg.textContent === ''){
        bg.textContent= Player1.Symbol;
        Player1.activePlayer = false;
        Player2.activePlayer = true;
        Player1.chosenNum.push(e.target.id);
        findOne(Winnerarray,Player1.chosenNum);
        counter +=1;
        if(winnerchecked === true && round === 5){
            bg.textContent= Player1.Symbol;
            Player1.score += 1;
            if(Player1.score > Player2.score){
                alert(`Player 1 won the game with a score of ${Player1.score}`);
                Player1.score = 0;
                Player2.score = 0
                round = 0;
                scoreP1.textContent = Player1.score;
                scoreP2.textContent = Player2.score;
                rnd.textContent = round;
                restart();
                counter =0;
            }else if (Player1.score < Player2.score){
                alert(`Player 2 won the game with a score of ${Player2.score}`);
                Player1.score,Player2.score,round = 0;
                scoreP1.textContent = Player1.score;
                scoreP2.textContent = Player2.score;
                rnd.textContent = round;
                restart();
                counter =0;
            }
        }else if(winnerchecked === true && round <5){
            bg.textContent= Player1.Symbol;
            setTimeout(alert("Player 1 Won the game"), 15);
            Player1.score += 1;
            round += 1;
            rnd.textContent = round;
            scoreP1.textContent = Player1.score;
            setTimeout(restart(),6000);
            counter =0;
        }
        
        
    }else if(Player2.activePlayer === true  && bg.textContent === ''){
        bg.textContent = Player2.Symbol;
        Player1.activePlayer = true;
        Player2.activePlayer = false;
        Player2.chosenNum.push(e.target.id);
        findOne(Winnerarray,Player2.chosenNum);
        counter +=1;
        if(winnerchecked === true && round === 5){
            bg.textContent = Player2.Symbol;
            Player2.score += 1;
            if(Player1.score > Player2.score){
                alert(`Player 1 won the game with a score of ${Player1.score}`);
                restart();
                counter =0;
            }else if (Player1.score < Player2.score){
                alert(`Player 2 won the game with a score of ${Player2.score}`);
                restart();
                counter =0;
            }
            
        }

        if(winnerchecked === true){
            bg.textContent = Player2.Symbol;
            setTimeout(alert("Player 2 Won the game"), 15);
            Player2.score += 1;
            round += 1;
            rnd.textContent = round;
            scoreP2.textContent = Player2.score;
            setTimeout(restart(),6000);
        }
    }
    Checkdraw();
}
// Find the winner

const findOne = function (haystack, arr) {
  
    haystack.forEach(item =>{
        let filtering = item.filter(value => -1 !== arr.indexOf(value))
        if(filtering.length >= 3){
            winnerchecked = true;
          console.log('the value of item ',item);
          console.log(filtering);
        }

        
});
}

const restart = function(){
   
    for (item of children){
        item.textContent = "";
    }
    Player1.chosenNum = [];
    Player2.chosenNum = [];
    winnerchecked = false;
    console.log(children);
}


function Checkdraw(){
    if (counter >=9){
        alert("it is a draw");
        alert("Restart the round");
        restart();
        counter = 0;
    }
}


div.addEventListener('click',Played);

