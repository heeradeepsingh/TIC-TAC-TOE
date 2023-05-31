document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('#gameboard');
    const infoDisplay = document.querySelector('#info');
    const restartButton = document.createElement('button'); // create restart button
    restartButton.textContent = 'Restart'; // set restart button text
    document.body.appendChild(restartButton); // add restart button to the DOM
  
     const startcells = ["", "", "", "", "", "", "", "", ""];
    let go = "Thor";
    infoDisplay.textContent = "Thor goes first";``
  
    function createBoard() {
        startcells.forEach((_cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            cellElement.id = index;
            cellElement.addEventListener('click', addGo);
            gameBoard.append(cellElement);
        })
    }
    createBoard();
  
    function addGo(e) {
        const goDisplay = document.createElement('div');
        goDisplay.classList.add(go);
        e.target.append(goDisplay);
        go = go === "Thor" ? "Hulk" : "Thor";
        infoDisplay.textContent = "It is now " +go + "'s go.";
        e.target.removeEventListener("click", addGo);
        checkScore();
    }
  
    function checkScore() {
        const allSquares = document.querySelectorAll(".square");
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
  
        let hasEmptySquares = false;
  
        winningCombos.forEach(array => {
            let HulkWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('Hulk'));
            if (HulkWins) {
                infoDisplay.textContent = "Hulk wins!";
                restartButton.style.display = 'block'; // show restart button
                allSquares.forEach(square => square.removeEventListener('click', addGo)); // remove click event listeners
            }
        });
  
        winningCombos.forEach(array => {
            let ThorWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('Thor'));
            if (ThorWins) {
                infoDisplay.textContent = "Thor Wins!";
                restartButton.style.display = 'block'; // show restart button
                allSquares.forEach(square => square.removeEventListener('click', addGo)); // remove click event listeners
            }
        });
  
        allSquares.forEach(square => {
            if (!square.firstChild) {
                hasEmptySquares = true;
            }
        });
  
        if (!hasEmptySquares) {
            infoDisplay.textContent = "Tie Game!";
            restartButton.style.display = 'block'; // show restart button
            allSquares.forEach(square => square.removeEventListener('click', addGo)); // remove click event listeners
        }
    }

    // add event listener to restart button
    restartButton.addEventListener('click', () => {
        gameBoard.innerHTML = ''; // clear game board
        createBoard(); // recreate game board
        restartButton.style.display = 'none'; // hide restart button
        infoDisplay.textContent = 'Hulk goes first'; // reset info display
    });
});
