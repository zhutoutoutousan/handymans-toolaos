/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // if p is * or s is empty, return true
    if (p.length === 0) return s.length === 0;
    if (p.length === 1) {
        if (p[0] === '*') return true;
    }

    var dp = [];
    for (var i = 0; i <= s.length; i++) {
        dp[i] = [];
        for (var j = 0; j <= p.length; j++) {
            dp[i][j] = false;
        }
    }
    dp[0][0] = true;
    for (var i = 1; i <= p.length; i++) {
        if (p[i - 1] === '*') {
            dp[0][i] = dp[0][i - 2];
        }
    }
    for (var i = 1; i <= s.length; i++) {
        for (var j = 1; j <= p.length; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2] || (s[i - 1] === p[j - 2] || p[j - 2] === '.') && dp[i - 1][j];
            } else {
                dp[i][j] = (s[i - 1] === p[j - 1] || p[j - 1] === '.') && dp[i - 1][j - 1];
            }
        }
    }
    return dp[s.length][p.length];    
};