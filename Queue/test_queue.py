import unittest
from queue import Queue

class TestQueue(unittest.TestCase):
	def setUp(self):
		self.queue = Queue()
	def test_enqueue(self):
		self.assertEqual(0, self.queue.get_size())
		self.queue.enqueue(5)
		self.assertEqual(1, self.queue.get_size())
		self.assertEqual(5, self.queue.peek())
		self.queue.enqueue(6)
		self.assertEqual(2, self.queue.get_size())
		self.assertEqual(5, self.queue.peek())
		self.queue.enqueue("hello")
		self.assertEqual(3, self.queue.get_size())
		self.assertEqual(5, self.queue.peek())
	def test_dequeue(self):
		self.queue.enqueue(12)
		self.queue.enqueue(14)
		self.queue.enqueue(16)
		self.assertEqual(3, self.queue.get_size())
		self.assertEqual(12, self.queue.dequeue())
		self.assertEqual(2, self.queue.get_size())
		self.assertEqual(14, self.queue.dequeue())
		self.assertEqual(1, self.queue.get_size())
		self.assertEqual(16, self.queue.dequeue())
		self.assertEqual(0, self.queue.get_size())
	def test_peek(self):
		self.assertEqual(None, self.queue.peek())
		self.queue.enqueue("test")
		self.assertEqual("test", self.queue.peek())
		self.queue.enqueue("word")
		self.assertEqual("test", self.queue.peek())
		self.queue.dequeue()
		self.assertEqual("word", self.queue.peek())
		self.queue.dequeue()
		self.assertEqual(None, self.queue.peek())
