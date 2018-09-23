import pdb
def mergesort(arr):
	_mergesort(arr, 0, len(arr) - 1)

def _mergesort(arr, left, right):
	print("calling mergesort: %s %s" % (left,right))
	if left < right:
		# Find middle point to divide subarray in half
		middle = (left + right) // 2 # // is Python operator for integer division
		# Call mergesort for left
		_mergesort(arr, left, middle)
		# Call mergesort for right
		_mergesort(arr, middle+1, right)
		# Merge the two (now sorted) halves
		merge(arr, left, middle, right)

def merge(arr, left, middle, right):
	# Merge the two subarrays
	# Store the subarrays we are workign with in temp vars
	# Merge the temp arrays back into arr
	pdb.set_trace()
	arr_left = arr[left:middle]
	arr_right = arr[middle:right]
	print ("merging %s %s" % (arr_left, arr_right))
	i = 0		# Start at 0 for temp array
	j = 0		# Start at 0 for temp array
	k = 0 # Start at left in the actual array
	while i < len(arr_left) and j < len(arr_right):
		# Find the smaller value between the two temp arrays
		# And insert it into the final array at position k
		if arr_left[i] < arr_right[j]:
			arr[k] = arr_left[i]
			i += 1
		else:
			arr[k] = arr_right[j]
			j += 1
		k += 1
	# If there are any leftover elements in arr_left, copy them
	while i < len(arr_left):
		arr[k] = arr_left[i]
		i += 1
		k += 1
	# If there are any leftover elements in arr_right, copy them
	while j < len(arr_right):
		arr[k] = arr_right[j]
		j += 1
		k += 1
	print("merged: " % arr)
