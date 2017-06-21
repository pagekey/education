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
		result = self.top.data
		self.top = self.top.next_node
		self.size -= 1
		return result
	def peek(self):
		return self.top.data
	def get_size(self):
		return self.size
