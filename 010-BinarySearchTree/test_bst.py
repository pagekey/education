import unittest
from bst import BST

class TestBST(unittest.TestCase):
	def setUp(self):
		self.bst = BST()
	def test_insert(self):
		self.assertEqual([], self.bst.inorder())
		self.assertEqual(True, self.bst.insert(5))
		self.assertEqual(False, self.bst.insert(5))
		self.assertEqual([5], self.bst.inorder())
		self.assertEqual(True, self.bst.insert(4))
		self.assertEqual([4,5], self.bst.inorder())
		self.assertEqual(True, self.bst.insert(7))
		self.assertEqual([4,5,7], self.bst.inorder())
	def test_find(self):
		self.assertEqual(False, self.bst.find(5))
		self.bst.insert(5)
		self.assertEqual(True, self.bst.find(5))
		self.assertEqual(False, self.bst.find(12))
		self.bst.insert(12)
		self.assertEqual(True, self.bst.find(5))
		self.assertEqual(True, self.bst.find(12))
		self.bst.remove(12)
		self.assertEqual(True, self.bst.find(5))
		self.assertEqual(False, self.bst.find(12))
		self.bst.remove(5)
		self.assertEqual(False, self.bst.find(5))
	def test_remove_1(self):
		# Empty tree
		self.assertEqual(False, self.bst.remove(5))
	def test_remove_2_1(self):
		# Value in root
		# 2.1 Leaf node
		self.bst.insert(5)
		self.assertEqual(True, self.bst.remove(5))
		self.assertEqual([], self.bst.inorder())
	def test_remove_2_2(self):	
		# 2.2 Left chilid only
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(3)
		self.assertEqual(5, self.bst.root.data)
		self.assertEqual([3,4,5], self.bst.inorder())
		self.assertEqual(True, self.bst.remove(5))
		self.assertEqual([3, 4], self.bst.inorder())
		self.assertEqual(4, self.bst.root.data)
	def test_remove_2_3(self):
		# 2.3 Right child only
		self.bst.insert(5)
		self.bst.insert(7)
		self.bst.insert(6)
		self.assertEqual(5, self.bst.root.data)
		self.assertEqual([5,6,7], self.bst.inorder())
		self.assertEqual(True, self.bst.remove(5))
		self.assertEqual([6,7], self.bst.inorder())
		self.assertEqual(7, self.bst.root.data)
	def test_remove_2_4(self):
		# 2.4 Both children
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(8)
		self.bst.insert(7)
		self.bst.insert(6)
		self.assertEqual(5, self.bst.root.data)
		self.assertEqual([4,5,6,7,8], self.bst.inorder())
		self.assertEqual(True, self.bst.remove(5))
		self.assertEqual([4, 6, 7, 8], self.bst.inorder())
		self.assertEqual(6, self.bst.root.data)
	def test_remove_3(self):
		# Value not in tree
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(8)
		self.bst.insert(7)
		self.bst.insert(6)
		self.assertEqual(False, self.bst.remove(100))
	def test_remove_4(self):
		# Node is leaf
		self.bst.insert(5)
		self.bst.insert(4)
		self.assertEqual(True, self.bst.remove(4))
		self.assertEqual([5], self.bst.inorder())
	def test_remove_5(self):
		# Node has left child only
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(8)
		self.bst.insert(7)
		self.bst.insert(6)
		self.assertEqual(True, self.bst.remove(8))
		self.assertEqual([4,5,6,7], self.bst.inorder())
		self.assertEqual(7, self.bst.root.right.data)
	def test_remove_6(self):
		# Node has right child only
		self.bst.insert(5)
		self.bst.insert(3)
		self.bst.insert(4)
		self.assertEqual(True, self.bst.remove(3))
		self.assertEqual([4,5], self.bst.inorder())
		self.assertEqual(4, self.bst.root.left.data)
	def test_remove_7(self):
		# Node has left and right child
		self.bst.insert(5)
		self.bst.insert(3)
		self.bst.insert(4)
		self.bst.insert(1)
		self.assertEqual(True, self.bst.remove(3))
		self.assertEqual([1,4,5], self.bst.inorder())
		self.assertEqual(4, self.bst.root.left.data)
	def test_preorder(self):
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(8)
		self.bst.insert(7)
		self.bst.insert(6)
		self.bst.insert(9)
		self.assertEqual([5,4,8,7,6,9], self.bst.preorder())
	def test_postorder(self):
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(8)
		self.bst.insert(7)
		self.bst.insert(6)
		self.bst.insert(9)
		self.assertEqual([4,6,7,9,8,5], self.bst.postorder())
	def test_inorder(self):
		self.bst.insert(5)
		self.bst.insert(4)
		self.bst.insert(8)
		self.bst.insert(7)
		self.bst.insert(6)
		self.bst.insert(9)
		self.assertEqual([4,5,6,7,8,9], self.bst.inorder())
