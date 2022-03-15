char * minWindow(char * s, char * t){
    int i, j, k, l, m;
    int count = 0;
    int len = 0;
    int left = 0;
    int right = 0;
    char *str = (char *)malloc(sizeof(char) * 100);
    for (i = 0; i < strlen(s); i++) {
        for (j = 0; j < strlen(t); j++) {
            if (s[i] == t[j]) {
                str[len++] = s[i];
                left++;
            } else {
                if (left > right) {
                    str[len++] = s[i];
                    left++;
                } else {
                    str[len++] = s[i];
                    right++;
                }
            }
        }
        str[len++] = s[i];
        right++;
        for (k = 0; k < len; k++) {
            if (str[k] == '(') {
                left++;
            } else {
                right--;
            }
            if (left == right) {
                count++;
            }
        }
        len = 0;
        left = 0;
        right = 0;
    }
    return str;
}

// Language: c
// Path: algorithm\generate-parentheses.c