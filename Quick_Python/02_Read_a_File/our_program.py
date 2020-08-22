#!/usr/bin/env python

# Opena  file using 'with' context manager,
# which takes care of closing the file when the block ends
with open('data.txt', 'r') as f:
	for line in f:
		print("I just read this line:", line.strip())

# The old way
#f = open('data.txt', 'r')
#for line in f:
#	print("I just read this line:", line)
#f.close()
