// https://codeforces.com/problemset/problem/1657/A
// Set up for codeforces
// Read line

var n = readline();
var coordinateArray = [];
for(var i = 0; i < n; i++) {
    // read line and push to coordinateArray
    coordinateArray.push(readline().split(' ').map(Number));
}

function calculateEuclideanSpace(coordinate) {
    return Math.sqrt(Math.pow(coordinate[0], 2) + Math.pow(coordinate[1], 2));
}


// Find the moves that satisfies calculateEuclideanSpace returns integer
function getMinMoves(coordinate) {
    var minMoves = 0;
    var euclideanSpace = calculateEuclideanSpace(coordinate);
    while(euclideanSpace % 1 !== 0) {
        minMoves++;
        euclideanSpace = calculateEuclideanSpace(coordinate);
    }
    return minMoves;
}


// Traverse coordinateArray and find minMoves, print them line by line
for(var i = 0; i < coordinateArray.length; i++) {
    print(getMinMoves(coordinateArray[i]));
}

