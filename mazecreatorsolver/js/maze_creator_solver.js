// Setup MazeCreatorSolver Predator name space
MAZE.namespace('MAZE.MazeCreatorSolver');

/**
 * Predator is a specialized critter that chases prey.
 * 
 */

MAZE.MazeCreatorSolver = function(width, height) {
    "use strict";
    
    // Guard against this object not being invoked with the "new" operator
    if (!(this instanceof MAZE.MazeCreatorSolver)) {
        return new MAZE.MazeCreatorSolver(width, height);
    }
    
    // member variables
    var publicInterface,
        mazeData = [],
        stack = [];
    
    /**
     *
     */
    function init() {
        var x,
            y;
        
        for (y = 0; y < height; y++) {
            mazeData[y] = [];
                
            for (x = 0; x < width; x++) {
                mazeData[y][x] = [0,1,1]; // [0,1,1] not visited, right wall, bottom wall
            }
        }
    }
    
    /**
     *
     */
    function printMaze() {
        var x,
            y,
            mrk,
            row,
            rgt,
            bot,
            lft,
            top
            
        for (y = 0; y < height; y++) {
            
            for (x = 0; x < width; x++) {
                mrk = (mazeData[y][x][0] < 2) ? "&nbsp;" : "&ordm;";
                row = (x > 0) ? "" : " left-wall";
                rgt = (mazeData[y][x][1] == 0) ? " right-off" : "";
                bot = (mazeData[y][x][2] == 0) ? " bottom-off" : "";
                lft = (x != 0) ? " left-off" : "";
                top = (y != 0) ? " top-off" : ""; // cells gone wild  ;o)
                top = ((x == 0) && (y == 0)) ? " top-off" : top;
                bot = ((x == width - 1) && (y == height - 1)) ? " bottom-off" : bot;
                document.write("<div class='cell" + row + rgt + lft + top + bot + "'>" + mrk + "</div>");
            }
        }
    }
    
    /**
     * Maze building adpated from recursive backtracker
     * 
     * The depth-first search algorithm of maze generation is frequently implemented using backtracking:
     * 
     * 1. Make the initial cell the current cell and mark it as visited
     * 2. While there are unvisited cells
     *      1. If the current cell has any neighbours which have not been visited
     *          1. Choose randomly one of the unvisited neighbours
     *          2. Push the current cell to the stack
     *          3. Remove the wall between the current cell and the chosen cell
     *          4. Make the chosen cell the current cell and mark it as visited
     *      2. Else if stack is not empty
     *          1. Pop a cell from the stack
     *          2. Make it the current cell
     *      3. Else
     *          1. Pick a random cell, make it the current cell and mark it as visited
     *
     * Source:
     * http://en.wikipedia.org/wiki/Maze_generation_algorithm
     * 
     */
    function buildMaze(x, y) {
        var nbrs = [],
            left,
            right,
            top,
            bottom,
            cur,
            ind,
            next,
            prev;
        
        mazeData[y][x][0] = 1; // mark as visited
        
        if (x != 0) {
            
            if (mazeData[y][x - 1][0] == 0) {
                var left = [(x - 1), y];
                nbrs.push(left);
            }
        }
        
        if (x != width - 1) {
            
            if (mazeData[y][x + 1][0] == 0) {
                var right = [(x + 1), y];
                nbrs.push(right);
            }
        }
        
        if (y != 0) {
            
            if (mazeData[y - 1][x][0] == 0) {
                var top = [x, (y - 1)];
                nbrs.push(top);
            }
        }
        
        if (y != height - 1) {
            
            if (mazeData[y + 1][x][0] == 0) {
                var bottom = [x, (y + 1)];
                nbrs.push(bottom);
            }
        }
        
        if (nbrs.length > 0) {
            cur = [x, y];
            stack.push(cur);
            ind = Math.floor(Math.random() * nbrs.length);
            next = nbrs[ind];
            
            if (next[0] == (x - 1)) {
                mazeData[y][x - 1][1] = 0;  //turn off left wall
            }
            
            if (next[0] == (x + 1)) {
                mazeData[y][x][1] = 0;      //turn off right wall
            }
            
            if (next[1] == (y - 1)) {
                mazeData[y - 1][x][2] = 0;  //turn off top wall
            }
            
            if (next[1] == (y + 1)) {
                mazeData[y][x][2] = 0;      //turn off bottom wall
            }
            
            buildMaze(next[0], next[1]);
        } else {
            
            if (stack.length > 0) {
                prev = stack.pop();
                buildMaze(prev[0], prev[1]);
            } else {
                return;
            }
        }
    }
    
    /**
     *
     */
    function resetFlags() {
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                mazeData[y][x][0] = 0;
            }
        }
    }
    
    /**
     * Recursive maze solver
     *
     */
    function solve(x, y) {
        mazeData[y][x][0] = 1; // mark as visited
        
        // check left
        if (x != 0) {
            if ((mazeData[y][x - 1][1] == 0) && (mazeData[y][x - 1][0] == 0)) {
                if (solve((x - 1), y)) {
                    mazeData[y][x][0] = 2; // mark as part of solution path
                    return true;
                }
            }
        }
        
        // check right
        if (x != (width - 1)) {
            if ((mazeData[y][x][1] == 0) && (mazeData[y][x + 1][0] == 0)) {
                if (solve((x + 1), y)) {
                    mazeData[y][x][0] = 2; // mark as part of solution path
                    return true;
                }
            }
        }
        
        // check top
        if (y != 0) {
            
            if ((mazeData[y - 1][x][2] == 0) && (mazeData[y - 1][x][0] == 0)) {
                
                if (solve(x, (y - 1))) {
                    mazeData[y][x][0] = 2; // mark as part of solution path
                    return true;
                }
            }
        }
        
        // check bottom
        if (y != (height - 1)) {
            
            if ((mazeData[y][x][2] == 0) && (mazeData[y + 1][x][0] == 0)) {
                
                if (solve(x, (y + 1))) {
                    mazeData[y][x][0] = 2; // mark as part of solution path
                    return true;
                }
            }
        }
        
        // check for last square
        if ((x == (width - 1)) && (y == (height - 1))) {
            mazeData[y][x][0] = 2; // mark as part of solution path
            return true;
        }
        
        return false;
    }
    
    // Public Interface - any methods defined here should be well documented
    publicInterface = {
        createMaze: function() {
            var xStart = width - 1,
                yStart = height - 1;
            
            init();
            buildMaze(xStart, yStart);
            document.write("<div id='unsolved'>");
            printMaze();
            document.write("</div>");
        },
        solveMaze: function() {
            resetFlags();
            solve(0, 0);
            document.write("<div id='solved'>");
            printMaze();
            document.write("</div>");
        }
    }
    
    return publicInterface;
}
