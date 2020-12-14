using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


// Das Buch, das die Programme benutzt, ist 

namespace test_project
{
    class Program
    {
        // You define enumerations directly in the namespace
        enum DaysOfWeek { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday};
        DaysOfWeek today; // Indicate the type, and give it a name.

        static int GenerateNumbers(int count)
        {
            
        }
        static void Main(string[] args)
        {
            int[] numbers = GenerateNumbers();
            Reverse(numbers);
            PrintNumbers(numbers);

            Console.WriteLine("Hello World");
            Console.ReadKey();
        }
    }
}   
