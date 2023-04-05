import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

/**
 * Solution Class
 * 
 * Sample Input：
 * Hello world
 * I am a file
 * Read me until end-of-file.
 * 
 * Sample Output:
 * 1 Hello world
 * 2 I am a file
 * 3 Read me until end-of-file.
 */
public class Solution {
    public static void main(String[] args) {
        // read  lines of input until you reach EOF, then number and print all  lines of content.
        // Driver Code
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            int lineNumber = 1;
            while (in.hasNextLine()) {
                String line = in.nextLine();
                System.out.println(lineNumber + " " + line);
                lineNumber++;
            }
        }
    }
}