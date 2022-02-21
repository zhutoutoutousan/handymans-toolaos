// The problem presented by Project Euler in Problem 18 is an optimization problem where you need to find the route through a triangle which maximizes the sum.  The problem reads
// "By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

// The following algorithm returns the wrong results
// url: https://www.mathblog.dk/project-euler-18/

// [] Copilot
// [] Comprehension
function triangleMaximumSlide(triangle) {
    var max = 0;
    var maxIndex = 0;
    var row = 0;
    var col = 0;
    var sum = 0;

    for (var i = 0; i < triangle.length; i++) {
        for (var j = 0; j < triangle[i].length; j++) {
            sum = triangle[i][j];
            if (i > 0) {
                if (j > 0) {
                    sum += triangle[i - 1][j - 1];
                }
                sum += triangle[i - 1][j];
            }
            if (sum > max) {
                max = sum;
                maxIndex = i;
                row = i;
                col = j;
            }
        }
    }

    return {
        max: max,
        row: row,
        col: col
    };
}

console.log(triangleMaximumSlide([
    [3],
    [7, 4],
    [2, 4, 6],
    [8, 5, 9, 3]
]));



