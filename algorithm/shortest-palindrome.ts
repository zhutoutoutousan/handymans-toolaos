function shortestPalindrome(s: string): string {
    let i = 0;
    let j = s.length - 1;
    while (i < j) {
        if (s[i] === s[j]) {
            i++;
            j--;
        } else {
            break;
        }
    }
    if (i >= j) {
        return s + s.slice(0, i).split("").reverse().join("");
    }
    let p = s.slice(0, i);
    let q = s.slice(i, j + 1);
    return shortestPalindrome(q) + q + p;
};