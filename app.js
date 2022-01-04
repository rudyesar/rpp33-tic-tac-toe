window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));
  console.log('document', document)
});

var nextPieceIsX = true;

function cellClickHandler(element) {
  console.log('elementID', element.srcElement.id)
  console.log('Cell clicked');

  var elementID = element.srcElement.id;
  if (document.getElementById(elementID).innerHTML !== '') {
    console.log('CELL TAKEN! Try Again!')
  } else if (nextPieceIsX) {
    document.getElementById(elementID).innerHTML = 'x';
    nextPieceIsX = !nextPieceIsX;
  } else {
    document.getElementById(elementID).innerHTML = 'o';
    nextPieceIsX = !nextPieceIsX;
  }

checkToSeeIfAnyWinner();
checkToSeeIfBoardFull();

};

function checkToSeeIfAnyWinner() {

};

function checkToSeeIfBoardFull() {

};

// document.querySelectorAll('td').forEach(cell => cell.addEventListener('click', cellClickHandler));