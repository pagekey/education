#!/usr/bin/env python
def quicksort(arr):
	_quicksort(arr, 0, len(arr) - 1)
def _quicksort(arr, low, high):
	if low < high: # If low >= high, this makes no sense - we must have reached the end, stop
		index = partition(arr, low, high)
		# Thanks to partition, arr[index] is now in the right place.
		_quicksort(arr, low, index - 1)
		_quicksort(arr, index + 1, high)
def partition(arr, low, high):
	wall_index = -1 # EVERYTHING we look at will be to the right of the wall, for simplicity
	current_index = 0
	pivot_index = len(arr) - 1
	while current_index < pivot_index:
		if arr[current_index] > arr[pivot_index]:
			break	
		else:
			# Element is smaller than the pivot value, but on the right hand side of the wall!
			# What the heck! Swap it ASAP
			# Move the wall up while you're at it
			wall_index += 1
			tmp = arr[current_index]
			arr[current_index] = arr[wall_index]
			arr[wall_index] = tmp
	# Okay, we're done sorting things according to the wall.
	# Now we swap our pivot into the place right after the wall.
#	wall_index += 1
	tmp = arr[wall_index]
	arr[wall_index] = arr[pivot_index]
	arr[pivot_index] = arr[wall_index]
	return wall_index

if __name__ == "__main__":
	arr1 = [9,4,6,1,2,8,3]
	print "Sorting %s" % arr1
	quicksort(arr1)
	print "Sorted: %s" % arr1
