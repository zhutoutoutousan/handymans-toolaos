/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    var map = {};
    for (var i = 0; i < t.length; i++) {
        if (map[t[i]]) {
            map[t[i]]++;
        } else {
            map[t[i]] = 1;
        }
    }
    var left = 0, right = 0, minLen = Number.MAX_VALUE, minLeft = 0, minRight = 0;
    while (right < s.length) {
        if (map[s[right]]) {
            map[s[right]]--;
            if (map[s[right]] >= 0) {
                while (map[s[left]] < 0) {
                    map[s[left]]++;
                    left++;
                }
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                    minRight = right;
                }
            }
        }
        right++;
    }
    return minLen === Number.MAX_VALUE ? '' : s.substring(minLeft, minRight + 1);    
};