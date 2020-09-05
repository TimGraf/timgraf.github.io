// Global MAZE namespace for all projects and applications
var MAZE = MAZE || {};
/*
 * Namespace Pattern
 *
 * Description: namespaces help reduce the number of globals required
 * and avoid naming collisions or excessive name prefixing.
 *
 * This was adapted from Stoyan Stefanov's Book,
 * "JavaScript Patterns" (2010) O'Reilly Media Inc.
 * 
 */
if (typeof MAZE.namespace === "undefined") {
    //
    MAZE.namespace = function(ns_string) {
        "use strict";
        
        var parts = ns_string.split('.'),
            parent = MAZE,
            i;
            
        // strip redundant leading global
        if (parts[0] === "MAZE") {
            parts = parts.slice(1);
        }
    
        for (i = 0; i < parts.length; i += 1) {
            // create a property if it doesn't exist
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };
}

// List of dependant JavaScript files for this module
var jsFiles = [
    "./js/maze_creator_solver.js"
];

// Load JavaScript files
for (var i = 0; i < jsFiles.length; i++) {
    document.write("<script type='text/javascript' src='" + jsFiles[i] + "'></script>");
}
