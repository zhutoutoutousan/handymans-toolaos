import math
import os
import random
import re
import sys


class Car:
    # The constructor for Car must take two arguments. The first of them is its maximum speed, and the second one is a string that denotes the units in which the speed is given: either "km/h" or "mph".
    def __init__(self, max_speed, speed_unit):
        self.max_speed = max_speed
        self.speed_unit = speed_unit
        self.speed = 0
    
    # The class must be implemented to return a string based on the arguments. For example, if the maxspeed is 100 mph and the current speed is 100 km/h, the string returned should be "Car with the maximum speed of 100 km/h". This also works for mph
    def __str__(self):
        return "Car with the maximum speed of {} {}".format(self.max_speed, self.speed_unit)


class Boat:
    # The constructor for Boat must take one argument. The argument is the maximum speed of the boat, in knots.
    def __init__(self, max_speed):
        self.max_speed = max_speed
        self.speed = 0
    
    # The class must be implemented to return a string based on the arguments. For example, if the maxspeed is 100 knots, the string returned should be "Boat with the maximum speed of 100 knots".
    def __str__(self):
        return "Boat with the maximum speed of {} knots".format(self.max_speed)



#!/bin/python3

import math
import os
import random
import re
import sys


# Deque sample input
# 6
# append 1
# append 2
# append 3
# appendleft 4
# pop
# popleft

# Sample out put
# 1
# 2

# >>> from collections import deque
# >>> d = deque()
# >>> d.append(1)
# >>> print d
# deque([1])
# >>> d.appendleft(2)
# >>> print d
# deque([2, 1])
# >>> d.clear()
# >>> print d
# deque([])
# >>> d.extend('1')
# >>> print d
# deque(['1'])
# >>> d.extendleft('234')
# >>> print d
# deque(['4', '3', '2', '1'])
# >>> d.count('1')
# 1
# >>> d.pop()
# '1'
# >>> print d
# deque(['4', '3', '2'])
# >>> d.popleft()
# '4'
# >>> print d
# deque(['3', '2'])
# >>> d.extend('7896')
# >>> print d
# deque(['3', '2', '7', '8', '9', '6'])
# >>> d.remove('2')
# >>> print d
# deque(['3', '7', '8', '9', '6'])
# >>> d.reverse()
# >>> print d
# deque(['6', '9', '8', '7', '3'])
# >>> d.rotate(3)
# >>> print d
# deque(['8', '7', '3', '6', '9'])

def deque(n):
    d = deque()
    for _ in range(n):
        d.append(input())
    return d
    

# Driver code
if __name__ == '__main__':
    n = int(input())
    print(deque(n))

