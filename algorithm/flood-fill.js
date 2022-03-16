/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    var oldColor = image[sr][sc];
    if (oldColor === newColor) return image;
    var m = image.length;
    var n = image[0].length;
    var queue = [[sr, sc]];
    while (queue.length) {
        var [i, j] = queue.shift();
        if (image[i][j] === oldColor) {
            image[i][j] = newColor;
            if (i > 0 && image[i - 1][j] === oldColor) queue.push([i - 1, j]);
            if (j > 0 && image[i][j - 1] === oldColor) queue.push([i, j - 1]);
            if (i < m - 1 && image[i + 1][j] === oldColor) queue.push([i + 1, j]);
            if (j < n - 1 && image[i][j + 1] === oldColor) queue.push([i, j + 1]);
        }
    }
    return image;
};