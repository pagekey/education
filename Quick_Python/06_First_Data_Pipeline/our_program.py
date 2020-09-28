# This time, we'll pipe data to our program, transform it, and save it somewhere else
# A simple data pipeline!

import sys

# Read from the standard input (file-like object)
for line in sys.stdin:
    raw_phone_number = line
    area_code = line[0:3]
    first_three = line[3:6]
    last_four = line[6:]
    print('(%s) %s-%s' % (area_code, first_three, last_four))
