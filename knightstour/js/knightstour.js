window.onload = function() {
    createGraph('');
};

// List of dependant JavaScript files for this module
var jsFiles = [
    './lib/kinetic-v4.7.0.min.js',
    './js/GraphicsInterface.js',
    './js/KnightsTourSolutionInterface.js'
];

// Load JavaScript files
for (var i = 0; i < jsFiles.length; i++) {
    document.write("<script type='text/javascript' src='" + jsFiles[i] + "'></script>");
}

function createGraph() {
    var boardSize   = 5,
        startSquare = {
            x: 0,
            y: 0,
            previous: null
        },
        graphicsInterface            = new GraphicsInterface(),
        knightsTourSolutionInterface = new KnightsTourSolutionInterface(boardSize),
        solution;

    graphicsInterface.init(boardSize);
    graphicsInterface.drawBoard();

    solution = knightsTourSolutionInterface.startNightsTour(startSquare);

    graphicsInterface.drawSolution(solution);
}