import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class codeDump {
    // Read parallelogram breath B and height H from standard initialization blocks
    static int B, H;
    
    // Static Initialization Blocks methods
    private static varType initialize(String[] args) {
        // Initialize the parallelogram breath B and height H
        B = Integer.parseInt(args[0]);
        H = Integer.parseInt(args[1]);
        return varType.INT;
    }


    public static void main(String[] args){
        // Initialize the parallelogram breath B and height H
        initialize(args);
        // Calculate and return its area
        System.out.println(B * H);
    }//end of main
}//end of class

