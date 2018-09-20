#!/usr/bin/env python
def quicksort(arr):
	_quicksort(arr, 0, len(arr) - 1)

def _quicksort(arr, low, high):
	if low >= high:
		return
	index = partition(arr, low, high)
	_quicksort(arr, low, index - 1)
	_quicksort(arr, index + 1, high)

def partition(arr, start, end):
	low = start + 1
	high = end
	pivot = low + (high - low) / 2 # Choose midpoint as pivot
	print "arr: %s lo: %s hi: %s pivot: %s" % (arr, low, high, pivot)
	while low < high:
		print "Cycle: lo %s hi %s" % (low,high)
		while low <= high and arr[low] <= arr[pivot]:
			low += 1
		while high >= low and arr[high] >= arr[pivot]:
			high -= 1
		# now we have two switchable elements
		# Swap em
		if low <= high: # Only swap if low is still low, and high is still high!
			print "swapping values %s and %s" % (arr[low],arr[high])
			tmp = arr[low]
			arr[low] = arr[high]
			arr[high] = tmp
		else:
			break
	tmp = arr[start]
	arr[start] = arr[high]
	arr[high] = tmp
	# Return pivot value
	return high 

if __name__ == "__main__":
	arr1 = [9,4,6,1,2,8,3]
	print "Sorting %s" % arr1
	quicksort(arr1)
	print "Sorted: %s" % arr1
