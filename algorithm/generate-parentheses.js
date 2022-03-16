/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var result = [];
    var dfs = function(left, right, str) {
        if (left === 0 && right === 0) {
            result.push(str);
            return;
        }
        if (left > 0) {
            dfs(left - 1, right, str + '(');
        }
        if (right > left) {
            dfs(left, right - 1, str + ')');
        }
    }
    dfs(n, n, '');
    return result;    
};