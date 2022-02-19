// Leetcode - Letter Combinations of a Phone Number: https://leetcode.com/problems/letter-combinations-of-a-phone-number/

// [x] Copilot solution
// [ ] Comprehension
// [ ] https://www.youtube.com/watch?v=0snEunUacZY

// Letter Combinations of a Phone Number
// The time complexity is O(4^n) where n is the number of digits in the phone number.
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // if digits is "", return empty vector
        if (digits.size() == 0) {
            return vector<string>();
        }
        vector<string> result = {};
        string letters[] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        for (int i = 0; i < digits.size(); i++) {
            int digit = digits[i] - '0';
            vector<string> tmp;
            for (int j = 0; j < result.size(); j++) {
                curr = result[j];
                for (int k = 0; k < letters[digit].size(); k++) {
                    tmp.push_back(curr + letters[digit][k]);
                }
            }
            result = tmp;
        }
        return result;
    }
    // Use backtrack methods
    // Time complexity: 
    // Space complexity: 
    vector<string> letterCombinationsBackTrack(string digits) {
        vector<string> result;
        if (digits.size() == 0) {
            return result;
        }
        string letters[] = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        string curr;
        backtrack(digits, letters, 0, curr, result);
        return result;
    }

    // backtrack method
    void backtrack(string digits, string letters[], int index, string curr, vector<string> &result) {
        if (index == digits.size()) {
            result.push_back(curr);
            return;
        }
        int digit = digits[index] - '0';
        for (int i = 0; i < letters[digit].size(); i++) {
            curr.push_back(letters[digit][i]);
            backtrack(digits, letters, index + 1, curr, result);
            curr.pop_back();
        }
    }
};