import unittest
import mergesort, quicksort_lomuto, quicksort_hoare

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
	def test_mergesort(self):
		for i,arr in enumerate(self.arrs):
			# Sort all test arrays
			mergesort.mergesort(arr)
			# Make sure they were sorted correctly
			self.assertEqual(self.arrs_sorted[i], arr)	
	def test_hoare(self):
		for i,arr in enumerate(self.arrs):
			quicksort_hoare.quicksort(arr)
			self.assertEqual(self.arrs_sorted[i], arr) 
	def test_lomuto(self):
		for i,arr in enumerate(self.arrs):
			quicksort_lomuto.quicksort(arr)
			self.assertEqual(self.arrs_sorted[i], arr) 
