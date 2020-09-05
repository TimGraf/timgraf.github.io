/*

 A knight's tour is a sequence of moves of a knight on a chessboard such that the knight visits every square only once.
 If the knight ends on a square that is one knight's move from the beginning square (so that it could tour the board
 again immediately, following the same path), the tour is closed, otherwise it is open.

 Possible Knight's moves

 2 up, 1 left
 2 up, 1 right
 1 up, 2 left
 1 up, 2 right
 2 down, 1 left
 2 down, 1 right
 1 down, 2 left
 1 down, 2 right

 Given a 5 x 5 board as shown below

 ┌───────┬───────┬───────┬───────┬───────┐
 │       │       │       │       │       │
 │  0,0  │  0,1  │  0,2  │  0,3  │  0,4  │
 │       │       │       │       │       │
 ├───────┼───────┼───────┼───────┼───────┤
 │       │       │       │       │       │
 │  1,0  │  1,1  │  1,2  │  1,3  │  1,4  │
 │       │       │       │       │       │
 ├───────┼───────┼───────┼───────┼───────┤
 │       │       │       │       │       │
 │  2,0  │  2,1  │  2,2  │  2,3  │  2,4  │
 │       │       │       │       │       │
 ├───────┼───────┼───────┼───────┼───────┤
 │       │       │       │       │       │
 │  3,0  │  3,1  │  3,2  │  3,3  │  3,4  │
 │       │       │       │       │       │
 ├───────┼───────┼───────┼───────┼───────┤
 │       │       │       │       │       │
 │  4,0  │  4,1  │  4,2  │  4,3  │  4,4  │
 │       │       │       │       │       │
 └───────┴───────┴───────┴───────┴───────┘

 */

KnightsTourSolutionInterface = function(boardSize) {
    "use strict";

    if (!(this instanceof KnightsTourSolutionInterface)) {
        return new KnightsTourSolutionInterface(boardSize);
    }

    var startSquare,
        publicInterface;

    function startNightsTour(start) {
        var path     = _checkMovesFromSquare(start),
            solution = [];

        solution.push({
            x: path.x,
            y: path.y
        });

        while (path.previous != null) {
            solution.push({
                x: path.previous.x,
                y: path.previous.y
            });

            path = path.previous;
        }

        return solution.reverse();
    }

    function _checkMovesFromSquare(square) {
        var nextMoves = _getMovesFromSquare(square);

        if (_isTourComplete(square)) {
            return square;
        }

        for (var i = 0; i < nextMoves.length; i++) {
            var nextMove = nextMoves[i];

            if (!_isSquareInPath(square, nextMove)) {
                var checkedSquare = _checkMovesFromSquare(nextMove);

                if (checkedSquare != null) {
                    return checkedSquare;
                }
            }
        }

        return null;
    }

    function _isTourComplete(square) {
        var path = [];

        path.push(square);

        while (square.previous != null) {
            path.push(square.previous);

            square = square.previous;
        }

        return (path.length == boardSize * boardSize);
    }

    function _isStartSquareInNextMoves(square) {
        var nextMoves = _getMovesFromSquare(square);

        nextMoves.forEach(function(move) {

            if (_areSameSquares(move, startSquare)) {
                return true;
            }
        });

        return false;
    }

    function _isSquareOnBoard(square) {
        return (square.x >= 0 && square.x < boardSize && square.y >= 0 && square.y < boardSize)
    }

    function _isSquareInPath(currentSquare, nextSquare) {
        var checkSquare = currentSquare.previous;

        if (checkSquare == null) {
            return false;
        } else if (_areSameSquares(checkSquare, nextSquare)) {
            return true;
        } else {
            return _isSquareInPath(checkSquare, nextSquare);
        }
    }

    function _areSameSquares(sqaure1, square2) {
        return (sqaure1.x == square2.x && sqaure1.y == square2.y);
    }

    function _getMovesFromSquare(square) {
        var validMoves    = [],
            possibleMoves = [
                {
                    x: square.x - 1,
                    y: square.y - 2,
                    previous: square
                }, {
                    x: square.x + 1,
                    y: square.y - 2,
                    previous: square
                }, {
                    x: square.x - 2,
                    y: square.y - 1,
                    previous: square
                }, {
                    x: square.x + 2,
                    y: square.y - 1,
                    previous: square
                }, {
                    x: square.x - 1,
                    y: square.y + 2,
                    previous: square
                }, {
                    x: square.x + 1,
                    y: square.y + 2,
                    previous: square
                }, {
                    x: square.x - 2,
                    y: square.y + 1,
                    previous: square
                }, {
                    x: square.x + 2,
                    y: square.y + 1,
                    previous: square
                }
            ];

        possibleMoves.forEach(function(move) {

            if (_isSquareOnBoard((move))) {
                validMoves.push(move);
            }
        });

        return validMoves;
    }

    publicInterface = {
        startNightsTour: startNightsTour
    };

    return publicInterface;
};