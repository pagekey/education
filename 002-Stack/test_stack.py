from stack import Stack
import unittest

class TestStack(unittest.TestCase):
	def setUp(self):
		self.stack = Stack()
	def test_push(self):
		# Push hello, then push yellow
		assert(self.stack.size == 0)
		self.stack.push("hello")
		assert(self.stack.size == 1)
		self.assertEqual("hello", self.stack.peek())
		self.stack.push("yellow")
		assert(self.stack.size == 2)
		assert(self.stack.peek() == "yellow")
		assert(self.stack.top.data == "yellow")
		assert(self.stack.top.next_node.data == "hello")
	def test_pop(self):
		# Push 1, 2, 3
		self.stack.push(1)
		self.stack.push(2)
		self.stack.push(3)
		assert(self.stack.size == 3)
		# Pop the 3
		self.assertEqual(3, self.stack.pop())
		assert(self.stack.size == 2)
		# Pop the 2
		assert(self.stack.pop() == 2)
		assert(self.stack.size == 1)
		# Pop the 1
		assert(self.stack.pop() == 1)
		assert(self.stack.size == 0)
		# Make sure popping while empty doesn't throw an error
		self.assertEqual(None, self.stack.pop())
	def test_peek(self):
		# Push "hello there"
		self.stack.push("hello there")
		assert(self.stack.peek() == "hello there")
		# Push 23
		self.stack.push(23)
		assert(self.stack.peek() == 23)
		# Push "we"
		self.stack.push("we")
		assert(self.stack.peek() == "we")

