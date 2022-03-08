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