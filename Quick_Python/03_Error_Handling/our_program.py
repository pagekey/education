#!/usr/bin/env python3

raw_number = input("Please enter a number: ")
try:
	number = int(raw_number)
	print("Thanks for entering that number. The square of that number is %s." % (number * number))
except ValueError:
	print("That's not a number!")

print("-----")

# An infinite loop will stop the program from continuing
# until valid input is received or the user quits.
mypi = None
while mypi is None:
	raw_mypi = input("Please enter your best guess at pi: ")
	try:
		mypi = float(raw_mypi)
	except ValueError:
		print("No can do. Conversion to float failed.")

# Now we can assume that mypi has been successfully converted to float
# Our first import statement! These usually go at the top of the file.
import math
print("Great job! You were off by: ", abs(math.pi - mypi))
