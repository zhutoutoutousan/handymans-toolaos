func shortestPalindrome(s string) string {
	if len(s) <= 1 {
		return s
	}
	for i := len(s) - 1; i >= 0; i-- {
		if isPalindrome(s[:i+1]) {
			return s[i+1:] + s
		}
	}
	return ""
}

func isPalindrome(s string) bool {
	for i := 0; i < len(s)/2; i++ {
		if s[i] != s[len(s)-1-i] {
			return false
		}
	}
	return true
}