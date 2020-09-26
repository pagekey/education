#!/usr/bin/env python

filename = input("What file would you like to write to? ")
message = input("What do you want to write? ")
raw_times_to_write = input("How many times should we write it? ")
times_to_write = int(raw_times_to_write)

with open(filename, 'w') as file:
    for i in range(times_to_write):
        print('Writing line',i)
        file.write(message + '\n')
    # File automatically closed at end of `with` by context manager

print('Wrote %d lines to %s' % (times_to_write, filename))
