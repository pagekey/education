#!/usr/bin/env python

def quicksort(arr):
	_quicksort(arr, 0, len(arr) - 1)

def _quicksort(arr, low, high):
	print "Called quicksort: %s %s %s" % (arr,low,high)
	if (low < high):
		# Get partition index
		# At this index, the element is at the right place
		pindex = partition(arr, low, high)

		_quicksort(arr, low, pindex - 1)
		_quicksort(arr, pindex + 1, high)

def partition(arr, low, high):
	print "\tCalled partition: %s %s %s" % (arr,low,high)
	# Pivot: place this element at the correct index for the final array
	pivot = arr[high]
	i = (low - 1) # Smaller element index
	j = low
	while j < high:
		if arr[j] <= pivot:
			i += 1
			swap(arr, i, j)
		j += 1
	swap(arr, i+1, high)
	print "\tReturned %s" % (i+1)
	return i+1

def swap(arr, i, j):
	print "SWAP: %s and %s" % (i,j)
	tmp = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp

if __name__ == "__main__":
	l = [4,5,2,3,1]
	quicksort(l)
	print l
