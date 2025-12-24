let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""]; // Flat board

function modify(ind) {
  const myDiv = document.getElementsByClassName("box")[ind];

  if (myDiv.innerHTML === "") {
    myDiv.innerHTML = turn;
    board[ind] = turn;

    if (checkWinner()) {
      setTimeout(() => {
        alert(`Player ${turn} wins!`);
        resetGame();
      }, 100);
    } else if (!board.includes("")) {
      setTimeout(() => {
        alert("It's a draw!");
        resetGame();
      }, 100);
    } else {
      turn = turn === "X" ? "O" : "X";
    }

  } else {
    alert("Value already inserted");
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  const boxes = document.getElementsByClassName("box");
  for (let box of boxes) {
    box.innerHTML = "";
  }
}
