using System;

namespace Coding.Exercise
{
    public class Exercise
    {
        public static void NestedCheck( int number )
        {
            // TODO
            // It is supposed to print the right message in the terminal depending on the given value:
            //             - when the value is divisible by 3. You have to print "Divisible by 3.";
            //             - when it is not divisible by 3, but divisible by 7 print "Divisible by 7."
            //             - Otherwise:
            //                                     - when it is an odd number, print "Odd number."
            //                                     - if not, print "Even number."
            // Example:
            // the number is equal to 3, "Divisible by 3." is printed;
            // the number is equal to 28, "Divisible by 7." is printed;
            // the number is equal to 1, "Odd number." is printed;
            // the number is equal to 2, "Even number." is printed.
            if (number % 3 == 0)
            {
                Console.WriteLine("Divisible by 3.");
            }
            else if (number % 7 == 0)
            {
                Console.WriteLine("Divisible by 7.");
            }
            else
            {
                if (number % 2 == 0)
                {
                    Console.WriteLine("Even number.");
                }
                else
                {
                    Console.WriteLine("Odd number.");
                }
            }
        }
    }
}
