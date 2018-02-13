document.addEventListener('DOMContentLoaded', function(){

  var boardEl = document.querySelector('.board');
  var moves = 0;
  var gameOn = true;

  boardEl.addEventListener('click', function(e){
    var statusSpan = document.querySelector('#statusSpan');
    var innerSpan = e.target.querySelector('span');
    var statusP = document.querySelector('.statusP');

    if (innerSpan.innerText === "" && gameOn) {
      // set letterToPlace to x or y depending on the turn
      var letterToPlace = statusSpan.className;
      // change class and content of innerSpan and its containing div
      innerSpan.classList.add(letterToPlace);
      innerSpan.innerText = letterToPlace.toUpperCase();
      e.target.classList.add(letterToPlace);
      // toggle classes and innerText on the statusSpan to set up next turn;
      statusSpan.classList.toggle('x');
      statusSpan.classList.toggle('o');
      statusSpan.innerText = statusSpan.className.toUpperCase();

      moves++;

      if (moves > 4 && moves < 9) {
        checkForWinner();
      } else if (moves >= 9) {
        statusP.style.fontSize = "36px";
        statusP.innerText = "TIE GAME";
        document.querySelector('.playAgain').style.display = 'inline-block';
      }
    }
  });

  function checkForWinner(){
    // ROWS
    var row1Divs = document.querySelectorAll('.r1');
    var row2Divs = document.querySelectorAll('.r2');
    var row3Divs = document.querySelectorAll('.r3');
    // COLUMNS
    var col1Divs = document.querySelectorAll('.c1');
    var col2Divs = document.querySelectorAll('.c2');
    var col3Divs = document.querySelectorAll('.c3');
    // DIAGONALS
    diag1Divs = [];
    diag1Divs.push(row1Divs[0]);
    diag1Divs.push(row2Divs[1]);
    diag1Divs.push(row3Divs[2]);
    diag2Divs = [];
    diag2Divs.push(row1Divs[2]);
    diag2Divs.push(row2Divs[1]);
    diag2Divs.push(row3Divs[0]);
    // Pass each of the above arrays to assertMatching
    assertMatching(row1Divs);
    assertMatching(row2Divs);
    assertMatching(row3Divs);
    assertMatching(col1Divs);
    assertMatching(col2Divs);
    assertMatching(col3Divs);
    assertMatching(diag1Divs);
    assertMatching(diag2Divs);
  }

  function assertMatching(boxes){
    var statusP = document.querySelector('.statusP');
    if (boxes[0].classList.contains('x') &&
      boxes[1].classList.contains('x') &&
      boxes[2].classList.contains('x')) {
      boxes.forEach(function(box) {
        box.classList.add('x-winner');
      });
      statusP.innerHTML = "<span id=\"statusSpan\" class=\"x\">X</span> WINS!";
      document.querySelector('.playAgain').style.display = 'inline-block';
      gameOn = false;
    } else if (boxes[0].classList.contains('o') &&
      boxes[1].classList.contains('o') &&
      boxes[2].classList.contains('o')) {
      boxes.forEach(function(box) {
        box.classList.add('o-winner');
      });
      statusP.innerHTML = "<span id=\"statusSpan\" class=\"o\">O</span> WINS!";
      document.querySelector('.playAgain').style.display = 'inline-block'
      gameOn = false;
    }
  }
});
