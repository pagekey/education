def insertionsort(arr):
	for i in range(1,len(arr)): # Start at element 1. Everything before is already sorted. 
		j = i # Start at j and work our way backward to find the spot in sorted array
		while j > 0 and arr[j-1] > arr[j]: # If the previous element is greater, swap our way backward
			temp = arr[j]
			arr[j] = arr[j-1]
			arr[j-1] = temp
			j -= 1
