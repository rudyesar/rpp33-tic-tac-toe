window.addEventListener('DOMContentLoaded', (event) => {
  // console.log('DOM fully loaded and parsed');
  document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));
  document.getElementById('restartButton').addEventListener('click', restartButtonHandler);
});

var state = {
  nextPieceIsX: true,
  stateOfBoard: ['', '', '', '', '', '', '', '', ''],
  gameOver: false,
}


var header2 = document.querySelector('h2');
var header3 = document.querySelector('h3');


function cellClickHandler(element) {
  var elementID = element.srcElement.id;

  if (state.stateOfBoard[elementID] !== '') {
    header3.innerText = 'Cell taken. Try again.';
    return;
  } else {
    placeXorO(elementID);
  }
  checkIfWinner(checkIfBoardFull);
};


function placeXorO(elementID) {
  var elementIndex = parseInt(elementID);

  if (state.nextPieceIsX) {
    document.getElementById(elementID).innerHTML = 'X';
    state.stateOfBoard[elementIndex] = 'X';
  } else {
    document.getElementById(elementID).innerHTML = 'O';
    state.stateOfBoard[elementIndex] = 'O';
  }
  state.nextPieceIsX = !state.nextPieceIsX;
  header3.innerText = 'Play allowed.';
};


function checkIfWinner(callback) {
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

    var first = state.stateOfBoard[index1 - 1];
    var second = state.stateOfBoard[index2 - 1];
    var third = state.stateOfBoard[index3 - 1];

    if (first === '' || second === '' || third === '') {

    } else if (first === second && second === third) {
      var header = document.querySelector('h2');
      header.innerText = first + ' WON!';
      return handleGameOver();
    }
  }
  callback();
};


function checkIfBoardFull() {
  var full = true;

  for (var i = 0; i < state.stateOfBoard.length; i++) {
    if (state.stateOfBoard[i] === '') {
      full = false;
    }
  }

  if (full) {
    header2.innerText = 'Board is full. Start a new game.';
    handleGameOver();
  }
};


function handleGameOver() {
  document.querySelectorAll('td').forEach(cell => cell.removeEventListener('click', cellClickHandler));
};


function restartButtonHandler() {
  state.nextPieceIsX = true;
  state.stateOfBoard = ['', '', '', '', '', '', '', '', ''];
  state.gameOver = false;
  document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));
  header2.innerText = '';
  header3.innerText = '';

  var table = document.getElementById('TttTable');

  for (var row of table.rows) {
    for (var cell of row.cells) {
      cell.innerHTML = '';
    }
  }
}












// document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));



  // Before refactoring for separation of concerns in cellClickHandler
  // if (document.getElementById(elementID).innerHTML !== '') {
  //   console.log('CELL TAKEN! Try Again!')
  // } else if (nextPieceIsX) {
  //   document.getElementById(elementID).innerHTML = 'X';
  //   var elementIndex = parseInt(elementID);
  //   stateOfBoard[elementIndex] = 'X';
  //   nextPieceIsX = !nextPieceIsX;
  //   console.log('state of board', stateOfBoard);

  // } else {
  //   document.getElementById(elementID).innerHTML = 'O';
  //   var elementIndex = parseInt(elementID);
  //   stateOfBoard[elementIndex] = 'O';
  //   nextPieceIsX = !nextPieceIsX;
  //   console.log('state of board', stateOfBoard);
  // }




// checkIfBoardFull before refactoring for separation of concerns
//     var table = document.getElementById('TttTable');

//   for (var row of table.rows) {
//     for (var cell of row.cells) {
//       if (cell.innerHTML === '') {
//         full = false;
//       }
//     }
//   }