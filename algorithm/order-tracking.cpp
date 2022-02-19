// Given a 2-d array, find 10 most sum of path in the array

// findSumPath Function
// Input: 2-d array
// Output: vector of vector of int, each vector is a path
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)

// vector <vector<int>> findSumPath(vector<vector<int>> &matrix) {
//     vector<vector<int>> result;
//     if (matrix.size() == 0) {
//         return result;
//     }
//     vector<int> curr;
//     findSumPath(matrix, 0, 0, curr, result);
//     return result;
// }

// define cout


void findSumPath(vector<vector<int>> &matrix, int i, int j, vector<int> &curr, vector<vector<int>> &result) {
    if (i == matrix.size() - 1 && j == matrix[0].size() - 1) {
        result.push_back(curr);
        return result;
    }
    if (i < matrix.size() && j < matrix[0].size()) {
        curr.push_back(matrix[i][j]);
        findSumPath(matrix, i + 1, j, curr, result);
        findSumPath(matrix, i, j + 1, curr, result);
        curr.pop_back();
    }
}

// test case
// vector<vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
// vector<vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};

// Function: print vector<vector<int>> to stdout
// Input: vector<vector<int>>
void printVector (var) {
    for (int i = 0; i < var.size(); i++) {
        for (int j = 0; j < var[i].size(); j++) {
            cout << var[i][j] << " ";
        }
        cout << endl;
    }
}

// driver code
int main() {
    vector<vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    vector<vector<int>> result
    vector<vector<int>> result = findSumPath(matrix);
    // Print 'result'
    printVector(result);
   return 0;
}