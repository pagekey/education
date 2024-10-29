class Node(object):
	def __init__(self, d):
		self.data = d
		self.next_node = None

class Stack(object):
	def __init__(self):
		self.top = None
		self.size = 0
	def push(self, d):
		new_node = Node(d)
		if self.top:
			new_node.next_node = self.top
		self.top = new_node
		self.size += 1
	def pop(self):
		if self.top is None:
			return None
		result = self.top.data
		self.top = self.top.next_node
		self.size -= 1
		return result
	def peek(self):
		if self.top is None:
			return None
		return self.top.data
	def is_empty(self):
		if self.top is None:
			return True
		else:
			return False
		# or simply:
		# return self.top is None
