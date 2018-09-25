def bubblesort(arr):
	while True:
		haveSwitched = False
		# One pass of swaps
		for i in range(1, len(arr)):
			if arr[i - 1] > arr[i]:
				haveSwitched = True 
				tmp = arr[i - 1]
				arr[i - 1] = arr[i]
				arr[i] = tmp
		if not haveSwitched:
			break
