from linked_list import LinkedList
import unittest

class TestLinkedList(unittest.TestCase):
	def setUp(self):
		self.test_list = LinkedList()
	def test_add(self):
		self.assertEqual(0, self.test_list.size)
		self.test_list.add("hello")
		assert(self.test_list.size == 1)
		assert(self.test_list.find("hello"))
		self.test_list.add("greetings")
		assert(self.test_list.size == 2)
		assert(self.test_list.find("greetings"))
	def test_add_at(self):
		self.test_list.add("first")
		self.test_list.add("second")
		self.test_list.add("third")
		self.assertEqual(["first", "second", "third"], self.test_list.to_list())
		self.assertEqual(True, self.test_list.add_at("1.5", 1))
		self.assertEqual(["first", "1.5", "second", "third"], self.test_list.to_list())
	def test_remove(self):
		self.test_list.add(3)
		self.test_list.add(2)
		assert(self.test_list.remove(22) == False)
		assert(self.test_list.size == 2)
		assert(self.test_list.remove(3))
		assert(self.test_list.remove(3) == False)
		assert(self.test_list.size == 1)
		assert(self.test_list.remove(2))
		assert(self.test_list.remove(2) == False)
		assert(self.test_list.size == 0)
	def test_find(self):
		self.test_list.add(3)
		self.test_list.add(4)
		self.test_list.add(5)
		assert(self.test_list.find(3))
		assert(self.test_list.find(4))
		assert(self.test_list.find(5))
		assert(self.test_list.find(2) == False)
