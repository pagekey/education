#!/usr/bin/env python3

  try:

	# Open a file using 'with' context manager,
	# which takes care of closing the file when the block ends
	with open('data.txt', 'r') as f:
	      for line in f:
		      print("I just read this line:", line.strip())

 	# The old way
	#f = open('data.txt', 'r')
	#for line in f:
	#	print("I just read this line:", line)
	#f.close()

  except OSError as err:
      print("OS error: {0}".format(err))
  except ValueError:
      print("Could not convert data to an integer.")
  except:
      print("Unexpected error:", sys.exc_info()[0])
      raise
