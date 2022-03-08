import java.util.*;
import java.util.regex.*;

class Parser {
    // Check if the string of curly brackets, round brackets is balanced
    static String isBalanced(String s) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '{' || c == '(' || c == '[') {
                stack.push(c);
            } else if (c == '}' || c == ')' || c == ']') {
                if (stack.isEmpty()) {
                    return "NO";
                }
                char top = stack.pop();
                if (c == '}' && top != '{') {
                    return "NO";
                }
                if (c == ')' && top != '(') {
                    return "NO";
                }
                if (c == ']' && top != '[') {
                    return "NO";
                }
            }
        }
        return stack.isEmpty() ? 'true' : 'false';
    }
}

class decryptResult {
    // for each word, unpack the <character><frequency> to that many characters, then reverse the string
    public static String decryptMessage(String encryptedMessage) {
        // if input is just one word, just reverse the string then return
        if (encryptedMessage.indexOf(' ') == -1) {
            return new StringBuilder(encryptedMessage).reverse().toString();
        }
        StringBuilder sb = new StringBuilder();
        String[] words = encryptedMessage.split(" ");
        for (String word : words) {
            String[] chars = word.split("<");
            for (String c : chars) {
                if (c.length() == 0) {
                    continue;
                }
                char ch = c.charAt(0);
                int freq = Integer.parseInt(c.substring(1, c.length() - 1));
                for (int i = 0; i < freq; i++) {
                    sb.append(ch);
                }
            }
        }
        return sb.reverse().toString();
    }
}