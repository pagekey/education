import unittest
import quicksort_hoare, quicksort_lomuto

class QuicksortTest(unittest.TestCase):
	def setUp(self):
		self.arr1 = [9,8,7,6,5,4,3,2,1]
		self.arr1_sorted = [1,2,3,4,5,6,7,8,9]
		self.arr2 = [7,5,8,2,1,9,6,4,3]
		self.arr2_sorted = self.arr1_sorted
		self.arr3 = [5,5,5,4]
		self.arr3_sorted = [4,5,5,5]
	def test_hoare(self):
		quicksort_hoare.quicksort(self.arr1)
		self.assertEqual(self.arr1_sorted, self.arr1) 
		quicksort_hoare.quicksort(self.arr3)
		self.assertEqual(self.arr3_sorted, self.arr3) 
	def test_lomuto(self):
		quicksort_lomuto.quicksort(self.arr1)
		self.assertEqual(self.arr1_sorted, self.arr1)
		quicksort_lomuto.quicksort(self.arr3)
		self.assertEqual(self.arr3_sorted, self.arr3)
