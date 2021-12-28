// By starting at the top of the triangle below and moving to adjacent numbers on the row below, find the maximum total from top to bottom of the pyramid
function longestSlideDown (pyramid) {
    var max = 0;
    var row = pyramid.length - 1;
    while (row >= 0) {
        for (var i = 0; i < pyramid[row].length; i++) {
        if (row === pyramid.length - 1) {
            max = pyramid[row][i];
        } else {
            pyramid[row][i] += Math.max(pyramid[row + 1][i], pyramid[row + 1][i + 1]);
            max = Math.max(max, pyramid[row][i]);
        }
        }
        row--;
    }
    return max;
}