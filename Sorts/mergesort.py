def mergesort(arr):
	# print("calling mergesort: %s" % (arr))
	if len(arr) < 2:
		return
	# Find middle point to divide subarray in half
	middle = len(arr) // 2 # // is Python operator for integer division
	left = arr[:middle]
	right = arr[middle:]
	# Call mergesort for left
	mergesort(left)
	# Call mergesort for right
	mergesort(right)
	# Merge the two (now sorted) halves
	merge(arr, left, right)

def merge(arr, left, right):
	# Merge the two subarrays
	# Merge the arrays back into arr
	# print ("merging %s %s" % (left, right))
	i = 0		# Start at 0 for left array
	j = 0		# Start at 0 for right array
	k = 0 		# Start at 0 in array to-be-merged
	while i < len(left) and j < len(right):
		# Find the smaller value between the two arrays to be merged
		# And insert it into the final array at position k
		if left[i] < right[j]:
			# Left has the smaller value, and should be inserted first
			arr[k] = left[i]
			i += 1
		else:
			# Right has the smaller value, and should be inserted first
			arr[k] = right[j]
			j += 1
		k += 1
	# If there are any leftover elements in left, copy them
	while i < len(left):
		arr[k] = left[i]
		i += 1
		k += 1
	# If there are any leftover elements in right, copy them
	while j < len(right):
		arr[k] = right[j]
		j += 1
		k += 1
	# print("merged: %s" % arr)
