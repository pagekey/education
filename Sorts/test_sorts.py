import unittest
import mergesort, quicksort_lomuto, quicksort_hoare, bubblesort

class TestSorts(unittest.TestCase):
	def setUp(self):
		self.arrs = [
			[9,8,7,6,5,4,3,2,1],
			[1,2,3,4],
			[5,5,5,4]
		]
		self.arrs_sorted = [
			[1,2,3,4,5,6,7,8,9],
			[1,2,3,4],
			[4,5,5,5]
		]
	# Generic helper method for testing each sort
	def _test_sort(self, func):
		for i,arr in enumerate(self.arrs):
			# Sort test array
			func(arr)
			# Make sure it was sorted correctly
			self.assertEqual(self.arrs_sorted[i], arr)	
	def test_mergesort(self):
		self._test_sort(mergesort.mergesort)
	def test_hoare(self):
		self._test_sort(quicksort_hoare.quicksort)
	def test_lomuto(self):
		self._test_sort(quicksort_lomuto.quicksort)
	def test_bubblesort(self):
		self._test_sort(bubblesort.bubblesort)
