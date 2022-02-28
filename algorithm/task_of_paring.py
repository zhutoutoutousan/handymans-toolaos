#!/bin/python3

import math
import os
import random
import re
import sys



# Complete the 'taskOfPairing' function below.
# Given an array as input freq, each index represents the weight of a node, each value of the array represents the number of nodes with that weight.
# If the weight difference is less than or equal to 1, then the two nodes can be paired
# Find the maximum node pairs situation and return the pairs
def maximumPairNumberCount(freq):
    # Traverse freq, take each number for the number of loops nested
    for i in range(len(freq)):
        for j in range(freq[i]):
            # If looped number is 

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    freq_count = int(input().strip())

    freq = []

    for _ in range(freq_count):
        freq_item = int(input().strip())
        freq.append(freq_item)

    result = taskOfPairing(freq)

    fptr.write(str(result) + '\n')

    fptr.close()


# Create a list, called my_list, with three numbers. The total of the numbers added together should be 100.
my_list = [10, 20, 30]
# Create a tuple, called my_tuple, with a single value in it
my_tuple = (10)
# Modify set2 so that set1.intersection(set2) returns {5, 77, 9, 12}
set1 = {14, 5, 9, 31, 12, 77, 67, 8}
set2 = {5, 77, 9, 12}


# -- Part 1 --
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

evens = []
for number in numbers:
    if number % 2 == 0:
        evens.append(number)


# if user inputs q, then print Quit
user_input = input("Enter your choice: ")
if user_input == "a":
    print("Add")
elif user_input == "q":
    print("Quit")