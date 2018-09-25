def bubblesort(arr):
	while not haveSwitched:
		# One pass of swaps
		haveSwitched = False 
		for i,elem in enumerate(arr):
			if i + 1 < len(arr):
				if arr[i] > arr[i+1]:
					haveSwitched = True 
					tmp = arr[i]
					arr[i] = arr[i+1]
					arr[i+1] = tmp
