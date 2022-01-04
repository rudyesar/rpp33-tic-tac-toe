window.addEventListener('DOMContentLoaded', (event) => {
  // console.log('DOM fully loaded and parsed');
    document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));
    document.getElementById('restartButton').addEventListener('click', restartButtonHandler);

  // console.log('document', document)
});

var nextPieceIsX = true;
var stateOfBoard = ['', '', '', '', '', '', '', '', ''];
var gameOver = false;
// var cellClickActive = true;

function cellClickHandler(element) {
  // console.log('elementID', element.srcElement.id)
  // console.log('Cell clicked');

  var elementID = element.srcElement.id;
  if (document.getElementById(elementID).innerHTML !== '') {
    console.log('CELL TAKEN! Try Again!')
  } else if (nextPieceIsX) {
    document.getElementById(elementID).innerHTML = 'X';
    var elementIndex = parseInt(elementID);
    stateOfBoard[elementIndex] = 'X';
    nextPieceIsX = !nextPieceIsX;
    console.log('state of board', stateOfBoard);

  } else {
    document.getElementById(elementID).innerHTML = 'O';
    var elementIndex = parseInt(elementID);
    stateOfBoard[elementIndex] = 'O';
    nextPieceIsX = !nextPieceIsX;
    console.log('state of board', stateOfBoard);

  }

  checkIfWinner(checkIfBoardFull);

};

function checkIfWinner(callback) {
  // var table = document.getElementById('TttTable');

  var winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  for (var i = 0; i < 8; i++) {
    var currentCombo = winningCombos[i];
    var index1 = currentCombo[0];
    var index2 = currentCombo[1];

    var index3 = currentCombo[2];

    var first = stateOfBoard[index1 - 1];
    var second = stateOfBoard[index2 - 1];
    var third = stateOfBoard[index3 - 1];

    if (first === '' || second === '' || third === '') {

    } else if (first === second && second === third) {
      console.log(first + ' WON!');
      var header = document.querySelector('h2');
      header.innerText = first + ' WON!';
      cellClickActive = false;
      return handleGameOver();
    }

  }
  callback();
  // return false;
};

function checkIfBoardFull() {

  var full = true;
  var table = document.getElementById('TttTable');

  for (var row of table.rows) {
    for (var cell of row.cells) {
      if (cell.innerHTML === '') {
        full = false;
      }
    }
  }

  if (full) {
    var header = document.querySelector('h2');
    header.innerText = 'Board is full. Start a new game.';
    cellClickActive = false;
    handleGameOver();
  }

};


function handleGameOver() {
  // if (!cellClickActive) {
    document.querySelectorAll('td').forEach(cell => cell.removeEventListener('click', cellClickHandler));
  // }
};

function restartButtonHandler() {
  nextPieceIsX = true;
  stateOfBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  cellClickActive = true;
  document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));
  var header = document.querySelector('h2');
  header.innerText = '';


  var table = document.getElementById('TttTable');

  for (var row of table.rows) {
    for (var cell of row.cells) {
      cell.innerHTML = '';
    }
  }

}

// document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));