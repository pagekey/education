from stack import Stack
import unittest

class TestStack(unittest.TestCase):
	def setUp(self):
		self.stack = Stack()
	def test_push(self):
		assert(self.stack.size == 0)
		self.stack.push("hello")
		assert(self.stack.size == 1)
		self.assertEqual("hello", self.stack.peek())
		self.stack.push("yellow")
		assert(self.stack.size == 2)
		assert(self.stack.peek() == "yellow")
	def test_pop(self):
		self.stack.push(1)
		self.stack.push(2)
		self.stack.push(3)
		assert(self.stack.size == 3)
		self.assertEqual(3, self.stack.pop())
		assert(self.stack.size == 2)
		assert(self.stack.pop() == 2)
		assert(self.stack.size == 1)
		assert(self.stack.pop() == 1)
		assert(self.stack.size == 0)
	def test_peek(self):
		self.stack.push("hello there")
		assert(self.stack.peek() == "hello there")
		self.stack.push(23)
		assert(self.stack.peek() == 23)
		self.stack.push("we")
		assert(self.stack.peek() == "we")

