// Include dependencies
#include <iostream>
#include <cstring>
#include <cstdio>
#include <cstdlib>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
#include <stack>
#include <map>
#include <set>
#include <string>
#include <cassert>

// Leetcode - 10. Regular Expression Matching
// https://leetcode.com/problems/regular-expression-matching/

// [ ] Copilot solution
// [ ] https://www.youtube.com/watch?v=HAA8mgxlov8

// create isMatch function that input the string and the pattern, and return true if the string match the pattern
class Solution {
    public:
        bool isMatch(string s, string p) {
            int m = s.size();
            int n = p.size();
            int i = 0;
            int j = 0;

            while (i < m && j < n) {
                if (p[j] == '*') {
                    if (j + 1 < n && p[j + 1] == '*') {
                        j++;
                    } else {
                        while (i < m && s[i] != p[j]) {
                            i++;
                        }
                        i++;
                    }
                } else if (s[i] == p[j] || p[j] == '?') {
                    i++;
                    j++;
                } else {
                    return false;
                }
            }
            if (i == m && j == n) {
                return true;
            }
            return false;
        }
};