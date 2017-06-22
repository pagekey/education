class Node(object):
	def __init__(self, d):
		self.data = d
		self.prev_node = None
		self.next_node = None

class Queue(object):
	def __init__(self):
		self.head = None
		self.tail = None
		self.size = 0
	def enqueue(self, d):
		new_node = Node(d)
		if self.size > 0:
			self.tail.prev_node = new_node
			new_node.next_node = self.tail
			self.tail = new_node
		else:
			self.head = new_node
			self.tail = new_node
		self.size += 1
	def dequeue(self):
		if self.head == None:
			return None
		result = self.head
		self.head = self.head.prev_node
		self.size -= 1
		return result.data
	def peek(self):
		if self.head:
			return self.head.data
		return None
	def get_size(self):
		return self.size

