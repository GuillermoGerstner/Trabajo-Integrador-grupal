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

function inCheck() {
    return false;
}

function checkValidity(piece, startRow, startCol, endRow, endCol) {
    if (piece === 'p') {
        if (endRow >= startRow) {
            return false;
        }

        if (startCol !== endCol) {
            return false;
        }
    }

    return true;
}



function movePiece(piece, startRow, startCol, endRow, endCol) {
    let isValid = checkValidity(piece, startRow, startCol, endRow, endCol);

    if (isValid) {
        board[startRow][startCol] = ' ';
        board[endRow][endCol] = piece;
    } else {
        console.error('Jugada Invalida!')
    }
}

function showValidMoves(piece, pos) {
    removeValidMoves();
    let x = pos[0];
    let y = pos[1];

    function highlightValid(squares) {
        squares.forEach((square) => {
            let squareUI = document.getElementById(`${square[0]}-${square[1]}`);
            squareUI.style.backgroundColor = 'yellow';
        });
    }

    switch (piece) {
        case 'p': 
            console.log(piece, pos);
            let squares = [[x - 1, y], [x - 2, y]];
            // check for diagnol and add to squares if piece there
            highlightValid(squares);
            break
    }
}

function removeValidMoves() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let square = document.getElementById(`${i}-${j}`);

            if (square.className === 'square squareWhite') {
                square.style.backgroundColor = 'wheat';
            } else {
                square.style.backgroundColor = 'rgb(111, 79, 37)';
            }
        }
    }
}

function drawBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let piece = board[i][j];
            let pos = [i, j];

            let square = document.getElementById(`${i}-${j}`);
            let img = document.createElement('img');
            square.innerHTML = '';

            switch (piece) {
                case 'P': 
                    img.src = '../../images/juegos/B_Pawn.png'; 
                    square.appendChild(img);
                    break
                case 'p': 
                    img.src = '../../images/juegos/W_Pawn.png'; 
                    square.appendChild(img);
                    img.addEventListener('click', () => {
                        showValidMoves(piece, pos);
                        console.log(img.width, img.height)
                    })
                    break
                case 'R': 
                    img.src = '../../images/juegos/B_Rook.png'; 
                    square.appendChild(img);
                    break
                case 'r': 
                    img.src = '../../images/juegos/W_Rook.png'; 
                    square.appendChild(img);
                    break
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
                    break
                case 'Q': 
                    img.src = '../../images/juegos/B_Queen.png'; 
                    square.appendChild(img);
                    break
                case 'q': 
                    img.src = '../../images/juegos/W_Queen.png'; 
                    square.appendChild(img);
                    break
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

drawBoard();

console.log(board)