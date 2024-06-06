const boardUI = document.getElementById('board');

let board = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // 0
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // 1
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // 2
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // 3
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // 4
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], // 5
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // 6
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']  // 7
    ];
  //  0    1    2    3    4    5    6    7

let white = ['p', 'r', 'n', 'b', 'q', 'k'];
let black = ['P', 'R', 'N', 'B', 'Q', 'K'];

function inCheck() {
    return false;
}

function checkValidity(piece, startRow, startCol, endRow, endCol) {
    let square = document.getElementById(`${endRow}-${endCol}`);
    // if (square.style.backgroundColor !== 'yellow') {
    //     console.log('invalid not yellow')
    //     return false;
    // }

    // if (piece === 'p') {
    //     if (endRow >= startRow) {
    //         return false;
    //     }

    //     if (startCol !== endCol) {
    //         return false;
    //     }
    // }

    return true;
}



function movePiece(piece, startRow, startCol, endRow, endCol) {
    let isValid = checkValidity(piece, startRow, startCol, endRow, endCol);

    if (isValid) {
        board[startRow][startCol] = ' ';
        board[endRow][endCol] = piece;
        drawBoard();
    } else {
        console.error('Jugada Invalida!');
        drawBoard();
    }
}

let eventHandlers = [];

function handleValidPosClick(newPosStr, x, y, piece) {
    let newPos = [Number(newPosStr[0]), Number(newPosStr[2])];
    console.log(newPos);
    movePiece(piece, x, y, newPos[0], newPos[1]);
    removeValidMoves();
}

function handleValidPosClickHandler(squareId, x, y, piece) {
    function clickHandler() {
        handleValidPosClick(squareId, x, y, piece);
    }
    eventHandlers.push(clickHandler);
    return clickHandler;
}

function showValidMoves(piece, pos) {
    removeValidMoves();
    let x = pos[0];
    let y = pos[1];

    function highlightValid(validPositions) {
        validPositions.forEach((position) => {
            let square = document.getElementById(`${position[0]}-${position[1]}`);
            square.style.backgroundColor = 'yellow';
            let clickHandler = handleValidPosClickHandler(square.id, x, y, piece);
            square.addEventListener('click', clickHandler);
        });
    }

    let validPositions = [];

    function checkSliding() {
        // Look Up
         for (let i = x - 1; i >= 0; i--) {
        // console.log(board[i][y])
            if (board[i][y] === ' ') {
                validPositions.push([i, y]);
            } else if (black.includes(board[i][y])) {
                validPositions.push([i, y]);
                break;
            } else {
                break;
            }
        }
        // Look down
        for (let i = x + 1; i <= 7; i++) {
            if (board[i][y] === ' ') {
                validPositions.push([i, y]);
            } else if (black.includes(board[i][y])) {
                validPositions.push([i, y]);
                break;
            } else {
                break;
            }
        }
        // Look left
        for (let i = y - 1; i >= 0; i--) {
            console.log(board[x][i])
            if (board[x][i] === ' ') {
                validPositions.push([x, i]);
            } else if (black.includes(board[x][i])) {
                validPositions.push([x, i]);
                break;
            } else {
                break;
            }
        }
        // Look right
        for (let i = y + 1; i <= 7; i++) {
            if (board[x][i] === ' ') {
                validPositions.push([x, i]);
            } else if (black.includes(board[x][i])) {
                validPositions.push([x, i]);
                break;
            } else {
                break;
            }
        }
    }

    function checkDiagonalSliding() {
        // Look Up-Left
        let i = x - 1;
        let j = y - 1;
        while (i >= 0 && j >= 0) {
            if (board[i][j] === ' ') {
                validPositions.push([i, j]);
            } else if (black.includes(board[i][j])) {
                validPositions.push([i, j]);
                break;
            } else {
                break;
            }
            i--;
            j--;
        }

        // Look Up-Right
        i = x - 1;
        j = y + 1;
        while (i >= 0 && j <= 7) {
            if (board[i][j] === ' ') {
                validPositions.push([i, j]);
            } else if (black.includes(board[i][j])) {
                validPositions.push([i, j]);
                break;
            } else {
                break;
            }
            i--;
            j++;
        }

        // Look Down-Left
        i = x + 1;
        j = y - 1;
        while (i <= 7 && j >= 0) {
            if (board[i][j] === ' ') {
                validPositions.push([i, j]);
            } else if (black.includes(board[i][j])) {
                validPositions.push([i, j]);
                break;
            } else {
                break;
            }
            i++;
            j--;
        }

        // Look Down-Right
        i = x + 1;
        j = y + 1;
        while (i <= 7 && j <= 7) {
            if (board[i][j] === ' ') {
                validPositions.push([i, j]);
            } else if (black.includes(board[i][j])) {
                validPositions.push([i, j]);
                break;
            } else {
                break;
            }
            i++;
            j++;
        }
    }

    switch (piece) {
        case 'p': 
            let up1 = [x - 1, y];
            let up2 = [x - 2, y];
            let diagL = [x - 1, y - 1];
            let diagR = [x - 1, y + 1];

            // Check pawn possible positions
            if (board[up1[0]][up1[1]] === ' ') {
                validPositions.push(up1);
            }
            if (x > 1) { // Check if out of bounds
                if (board[up2[0]][up2[1]] === ' ' && x === 6) {
                    validPositions.push(up2);
                }
            }
            if (board[diagL[0]][diagL[1]] !== ' ' && black.includes(board[up1[0]][up1[1]])) {
                validPositions.push(diagL);
            }
            if (board[diagR[0]][diagR[1]] !== ' ' && black.includes(board[up1[0]][up1[1]])) {
                validPositions.push(diagR);
            }
            highlightValid(validPositions);
            break;
        case 'r':
            checkSliding();
            highlightValid(validPositions);
            break;
        case 'b':
            checkDiagonalSliding();
            highlightValid(validPositions);
            break;
        case 'q':
            checkSliding();
            checkDiagonalSliding();
            highlightValid(validPositions);
            break;
    }
}

function removeValidMoves() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let square = document.getElementById(`${i}-${j}`);

            if (square.className === 'square squareWhite' && square.style.backgroundColor === 'yellow') {
                square.style.backgroundColor = 'wheat';
                eventHandlers.forEach(handler => {
                    square.removeEventListener('click', handler);
                });
            } else if (square.className === 'square squareBlack' && square.style.backgroundColor === 'yellow') {
                square.style.backgroundColor = 'rgb(111, 79, 37)';
                eventHandlers.forEach(handler => {
                    square.removeEventListener('click', handler);
                });
            }
        }
    }
    eventHandlers = [];
}

function drawBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let piece = board[i][j];
            let pos = [i, j];

            let square = document.getElementById(`${i}-${j}`);
            let img = document.createElement('img');
            img.draggable = false;
            square.innerHTML = '';

            switch (piece) {
                case 'P': 
                    img.src = '../../images/juegos/B_Pawn.png'; 
                    square.appendChild(img);
                    break
                case 'p': 
                    img.src = '../../images/juegos/W_Pawn.png'; 
                    square.appendChild(img);
                    img.addEventListener('click', function handlePieceClick() {
                        showValidMoves(piece, pos);
                        img.removeEventListener('click', handlePieceClick);
                    });
                    break;
                case 'R': 
                    img.src = '../../images/juegos/B_Rook.png'; 
                    square.appendChild(img);
                    break
                case 'r': 
                    img.src = '../../images/juegos/W_Rook.png'; 
                    square.appendChild(img);
                    img.addEventListener('click', function handlePieceClick() {
                        showValidMoves(piece, pos);
                        img.removeEventListener('click', handlePieceClick);
                    });
                    break;
                case 'N': 
                    img.src = '../../images/juegos/B_Knight.png'; 
                    square.appendChild(img);
                    break
                case 'n': 
                    img.src = '../../images/juegos/W_Knight.png'; 
                    square.appendChild(img);
                    break
                case 'B': 
                    img.src = '../../images/juegos/B_Bishop.png'; 
                    square.appendChild(img);
                    break
                case 'b': 
                    img.src = '../../images/juegos/W_Bishop.png'; 
                    square.appendChild(img);
                    img.addEventListener('click', function handlePieceClick() {
                        showValidMoves(piece, pos);
                        img.removeEventListener('click', handlePieceClick);
                    });
                    break;
                case 'Q': 
                    img.src = '../../images/juegos/B_Queen.png'; 
                    square.appendChild(img);
                    break
                case 'q': 
                    img.src = '../../images/juegos/W_Queen.png'; 
                    square.appendChild(img);
                    img.addEventListener('click', function handlePieceClick() {
                        showValidMoves(piece, pos);
                        img.removeEventListener('click', handlePieceClick);
                    });
                    break;
                case 'K': 
                    img.src = '../../images/juegos/B_King.png'; 
                    square.appendChild(img);
                    break
                case 'k': 
                    img.src = '../../images/juegos/W_King.png'; 
                    square.appendChild(img);
                    break
            }


        }
    }
}

drawBoard();

// movePiece('p', 6, 0, 4, 0);
// drawBoard();

console.log(board)