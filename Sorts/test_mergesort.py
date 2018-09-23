import unittest
import mergesort

class TestMergeSort(unittest.TestCase):
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
		for i,a in enumerate(self.arrs):
			# Sort all test arrays
			mergesort.mergesort(a)
			# Make sure they were sorted correctly
			self.assertEqual(self.arrs_sorted[i], a)	
