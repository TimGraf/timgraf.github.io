GraphicsInterface = function() {
    "use strict";

    if (!(this instanceof GraphicsInterface)) {
        return new GraphicsInterface();
    }

    // Constants
    var RADIUS       = 12,
        SQUARE_SIZE  = 50,
        LIGHT_SQUARE = '#E6E6E6',
        DARK_SQUARE  = '#A4A4A4',
        LINE_COLOR   = 'black',
        LINE_WIDTH   = 1,
        CIRCLE_COLOR = 'white',
        TEXT_FONT    = 'Calibri',
        TEXT_ALIGN   = 'center',
        FONT_SIZE    = 10;

    var publicInterface,
        boardSize,
        stage,
        layer;

    function init(size) {
        boardSize  = size;
        stage      = _createKineticStage();
        layer      = _createKineticLayer();
    }

    function drawBoard() {

        if (_graphicsInitialized()) {
            _drawBoard();
        }
    }

    function drawSolution(solution) {
        var xPos,
            yPos,
            xPosEnd,
            yPosEnd;

        // Draw lines first so that the solution nodes are on top
        solution.forEach(function(node, index) {
            xPos = SQUARE_SIZE * node.x + 1 + (SQUARE_SIZE / 2);
            yPos = SQUARE_SIZE * node.y + 1 + (SQUARE_SIZE / 2);

            if (index < solution.length - 1) {
                xPosEnd = SQUARE_SIZE * solution[index + 1].x + 1 + (SQUARE_SIZE / 2);
                yPosEnd = SQUARE_SIZE * solution[index + 1].y + 1 + (SQUARE_SIZE / 2);

                _drawLine(layer, {x: xPos, y: yPos}, {x: xPosEnd, y: yPosEnd});
            }
        });

        stage.add(layer);

        solution.forEach(function(node, index) {
            xPos = SQUARE_SIZE * node.x + 1 + (SQUARE_SIZE / 2);
            yPos = SQUARE_SIZE * node.y + 1 + (SQUARE_SIZE / 2);

            _drawNode(layer, xPos, yPos, RADIUS, index);
        });

        stage.add(layer);
    }

    function _graphicsInitialized() {
        return (typeof layer !== 'undefined') && (typeof stage !== 'undefined')
    }

    function _createKineticStage() {
        return new Kinetic.Stage({
            container: 'container',
            width:     boardSize * SQUARE_SIZE,
            height:    boardSize * SQUARE_SIZE
        });
    }

    function _createKineticLayer() {
        return new Kinetic.Layer();
    }

    function _drawBoard() {
        var xPos,
            yPos,
            color;

        for (var x = 0; x < boardSize; x++) {

            for (var y = 0; y < boardSize; y++) {
                xPos  = x * SQUARE_SIZE;
                yPos  = y * SQUARE_SIZE;
                color = ((x + y) % 2 == 0) ? LIGHT_SQUARE : DARK_SQUARE;

                _drawSquare(layer, xPos, yPos, SQUARE_SIZE, color);
            }
        }

        stage.add(layer);
    }

    function _drawSquare(layer, xPos, yPos, size, color) {

        layer.add(new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: size,
            height: size,
            fill: color,
            stroke: LINE_COLOR,
            strokeWidth: LINE_WIDTH
        }));
    }

    function _drawNode(layer, xPos, yPos, radius, value) {

        layer.add(new Kinetic.Circle({
            x: xPos,
            y: yPos,
            radius: radius,
            fill: CIRCLE_COLOR,
            stroke: LINE_COLOR,
            strokeWidth: LINE_WIDTH
        }));

        layer.add(new Kinetic.Text({
            x: (value < 10) ? xPos - 3 : xPos - 5,
            y: yPos - 4,
            text: value,
            align: TEXT_ALIGN,
            fontSize: FONT_SIZE,
            fontFamily: TEXT_FONT,
            fill: LINE_COLOR
        }));
    }

    function _drawLine(layer, point1, point2) {

        layer.add(new Kinetic.Line({
            points: [point1, point2],
            stroke: LINE_COLOR,
            strokeWidth: LINE_WIDTH
        }));
    }

    publicInterface = {
        init:         init,
        drawBoard:    drawBoard,
        drawSolution: drawSolution
    };

    return publicInterface;
};