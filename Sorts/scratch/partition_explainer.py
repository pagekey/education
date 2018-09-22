# Not as helpful as I thought it would have been.
def partition_explainer(arr, low, high):
	pivot = arr[low]
	i = low								
	j = high						
	printStep(arr, low, high, pivot, i, j)
	endStep()
	while True:
		printStep(arr, low, high, pivot, i, j)
		endStep()
		while arr[i] < pivot:		
			i += 1				
		printStep(arr, low, high, pivot, i, j)
		print ("%s < %s - %s" % (arr[j], pivot, arr[j] > pivot))
		endStep()
		while arr[j] > pivot:
			j -= 1			
		printStep(arr, low, high, pivot, i, j)
		print ("%s >= %s - %s" % (i,j, i >= j))
		endStep()
		if i >= j:		
			printStep(arr, low, high, pivot, i, j)
			print("return %s" % j)
			endStep()
			return j
		print("swap positions %s and %s" % (i,j))
		swap(arr, i, j)						
		endStep()

def printStep(arr, low, high, pivot, i, j):
	print("arr=%s; low=%s; high=%s" % (arr, low, high))
	print("pivot = %s" % pivot)
	print("i = %s" % i)
	print("j = %s" % j)
	print("True")
	print ("%s < %s - %s" % (arr[i], pivot, arr[i] < pivot))

def endStep():
	print("-----------")

def swap(arr, i, j):					# Swap indices i and j in arr
	tmp = arr[i]						# Set i's value to tmp, to prevent overwriting it
	arr[i] = arr[j]						# Swap j's value into i's place
	arr[j] = tmp						# Swap i's value into j's place

if __name__ == "__main__":
		arr = [7,9,4,5]
		partition_explainer(arr, 0, 3)
