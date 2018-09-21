def quicksort(arr):
	_quicksort(arr, 0, len(arr) - 1)

def _quicksort(arr, low, high):
	if low < high: 						# if low == high, we are done (1 element in array, so it's as sorted as it gets)
		p = partition(arr, low, high) 	# Put one element in right place; move other elements left or right of it based on size
# NOTE: The following line is the only difference between Lomuto and Hoare.
# Notice the left half quicksort is from low to p in Hoare.
		_quicksort(arr, low, p) 	# Sort left half, before the sorted element
		_quicksort(arr, p + 1, high)	# Sort irght half, after the sorted element

def partition(arr, low, high):			# We already know low < high, so there's at least 2 elements in arr
	# Optional: Set pivot as median of three values, and swap to last position
	pivot = arr[low] 					# Pivot is lower part.
										# TODO: Check if it matters where pivot is for either one (can it be in the middle? at the end?)
	i = low								# Set left hand index to the first element
	j = high							# Set right hand index to the last element.
	while True:
		while arr[i] < pivot:			# If less than pivot AND on left (i) side, it's okay. No action needed.
			i += 1						# Slide past this element and check the next one, moving toward the middle
		while arr[j] > pivot			# If greater than pivot AND on right (j) side, it's okay. No action needed.
			j -= 1						# Slide past this element and check the next one, moving toward the middle
		if i >= j:						# i >= j indicates that the two indexes have converged in the middle; we are done swapping
			return j					# j is the location where the pivot should be
										# TODO - Does the pivot automatically get swapped in here? Examine run results
		swap(arr, i, j)					# Otherwise, i and j point to two elements in the wrong half of the array. Swap them and both will be corrected.

def swap(arr, i, j):					# Swap indices i and j in arr
	tmp = arr[i]						# Set i's value to tmp, to prevent overwriting it
	arr[i] = arr[j]						# Swap j's value into i's place
	arr[j] = tmp						# Swap i's value into j's place
