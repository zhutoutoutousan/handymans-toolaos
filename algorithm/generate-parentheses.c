

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
char ** generateParenthesis(int n, int* returnSize){
    char **result = (char **)malloc(sizeof(char *) * 100);
    int i, j, k, l, m;
    int count = 0;
    int len = 0;
    int left = 0;
    int right = 0;
    char *str = (char *)malloc(sizeof(char) * 100);
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if (i == j) {
                str[len++] = '(';
                left++;
            } else {
                if (left > right) {
                    str[len++] = '(';
                    left++;
                } else {
                    str[len++] = ')';
                    right++;
                }
            }
        }
        str[len++] = ')';
        right++;
        for (k = 0; k < len; k++) {
            if (str[k] == '(') {
                left++;
            } else {
                right--;
            }
            if (left == right) {
                result[count] = (char *)malloc(sizeof(char) * 100);
                for (l = 0; l < len; l++) {
                    result[count][l] = str[l];
                }
                count++;
            }
        }
        len = 0;
        left = 0;
        right = 0;
    }
    *returnSize = count;
    // Free memory
    free(*str);
    return result;
}