# This time, we'll pipe data to our program, transform it, and save it somewhere else
# A simple data pipeline!

import sys

# Read from the standard input (file-like object)
for line in sys.stdin:
    raw_phone_number = line.strip()
    # <optional: check whether the line is a valid phone number here>
    # Substrings for each part of the telephone number
    area_code = raw_phone_number[0:3]
    first_three = raw_phone_number[3:6]
    # Include from the 6th character all the way to the end (wherever that is)
    last_four = raw_phone_number[6:]
    # Print the formatted number to stdout, where it can be redirected to a file
    print('(%s) %s-%s' % (area_code, first_three, last_four))
