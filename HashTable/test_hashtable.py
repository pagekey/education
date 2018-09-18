from hashtable import HashTable
import unittest

class TestHashTable(unittest.TestCase):
	def setUp(self):
		self.ht = HashTable()
	def test_hash(self):
		self.assertEqual(self.ht.hash("hello"), self.ht.hash("hello"))
		self.assertTrue(self.ht.hash("hello") < self.ht.capacity)
	def test_insert(self):
		self.assertEqual(self.ht.size, 0)
		self.ht.insert("test_key", "test_value")
		self.assertEqual(self.ht.size, 1)
		self.assertEqual(self.ht.buckets[self.ht.hash("test_key")].value, "test_value")
	def test_find(self):
		self.assertEqual(self.ht.size, 0)
		obj = "hello"
		self.ht.insert("key1", obj)
		self.assertEqual(obj, self.ht.find("key1"))
		obj = ["this", "is", "a", "list"]
		self.ht.insert("key2", obj)
		self.assertEqual(obj, self.ht.find("key2"))
	def test_remove(self):
		self.assertEqual(self.ht.size, 0)
		obj = "test object"
		self.ht.insert("key1", obj)
		self.assertEqual(1, self.ht.size)
		self.assertEqual(obj, self.ht.remove("key1"))
		self.assertEqual(0, self.ht.size)
		self.assertEqual(None, self.ht.remove("some random key"))
	def test_capacity(self):
		# Test all public methods in one run at a large capacity
		for i in range(0,1000):
			self.assertEqual(i, self.ht.size)
			self.ht.insert("key" + str(i), "value")
		self.assertEqual(self.ht.size, 1000)
		for i in range(0,1000):
			self.assertEqual(1000-i, self.ht.size)
			self.assertEqual(self.ht.find("key" + str(i)), self.ht.remove("key" + str(i)))
	def test_issue2(self):
		self.assertEqual(self.ht.size, 0)
		self.ht.insert('A', 5)
		self.assertEqual(self.ht.size, 1)
		self.ht.insert('B', 10)
		self.assertEqual(self.ht.size, 2)
		self.ht.insert('Ball', 'hello')
		self.assertEqual(self.ht.size, 3)

		self.assertEqual(5, self.ht.remove('A'))
		self.assertEqual(self.ht.size, 2)
		self.assertEqual(None, self.ht.remove('A'))
		self.assertEqual(self.ht.size, 2)
		self.assertEqual(None, self.ht.remove('A'))
		self.assertEqual(self.ht.size, 2)
