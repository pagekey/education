def quicksort(arr):
	_quicksort(arr, 0, len(arr) - 1)

def _quicksort(arr, low, high):
	if low < high: 						# if low == high, we are done (1 element in array, so it's as sorted as it gets)
		p = partition(arr, low, high) 	# Put one element in right place; move other elements left or right of it based on size
# NOTE: The following line is the only difference between Lomuto and Hoare.
# Notice the left half quicksort is from low to p-1 in Lomuto.
		_quicksort(arr, low, p - 1) 	# Sort left half, before the sorted element
		_quicksort(arr, p + 1, high)	# Sort right half, after the sorted element

def partition(arr, low, high):			# We already know low < high, so there's at least 2 elements in arr
	# Optional: Set pivot as median of three values, and swap to last position
	pivot = arr[high]					# Set pivot to highest value. We will deal with everything before it, iterating
	wall = low							# Everything left of wall has been checked and is less than pivot
	i = low								# Counter for each element
	while i < high:						# For each element, EXCLUDING the pivot, we will check if less than pivot.
		if arr[i] < pivot:				# We found something to put behind the wall!
			swap(arr, wall, i)			# Swap element at i to be behind the wall.
			wall += 1					# Move the wall up by one.
		i += 1
	swap(arr, wall, high)					# Swap the high index (the pivot index) into it's new place. All to left of it is less, all to right greater than or equal
	return wall

def swap(arr, i, j):					# Swap indices i and j in arr
	tmp = arr[i]						# Set i's value to tmp, to prevent overwriting it
	arr[i] = arr[j]						# Swap j's value into i's place
	arr[j] = tmp						# Swap i's value into j's place
