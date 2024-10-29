class Node(object):
	def __init__(self, d):
		self.next_node = None
		self.data = d

class LinkedList(object):
	def __init__(self):
		self.head = None
		self.tail = None
		self.size = 0
	# Add d to tail of list
	def add(self, d):
		new_node = Node(d)
		if self.tail:
			self.tail.next_node = new_node
			self.tail = new_node
		else:
			self.head = new_node
			self.tail = new_node
		self.size += 1
	# Add d at location index in list
	def add_at(self, d, index):
		new_node = Node(d)
		previous_node = None
		current_node = self.head
		i = 0
		while i < index and current_node.next_node:
			previous_node = current_node
			current_node = current_node.next_node
			i += 1
		if i == index:
			previous_node.next_node = new_node
			new_node.next_node = current_node
			return True
		else:
			# List not long enough
			return False
	# Remove d; return True if successful, false otherwise
	def remove(self, d):
		previous_node = None
		current_node = self.head
		while current_node:
			if current_node.data == d:
				if previous_node:
					previous_node.next_node = current_node.next_node
				else:
					self.head = current_node.next_node
				self.size -= 1
				return True
			previous_node = current_node
			current_node = current_node.next_node
		return False
	# Return True if d is in list, false otherwise
	def find(self, d):
		current_node = self.head
		while current_node:
			if current_node.data == d:
				return True
			current_node = current_node.next_node
		return False
	def to_list(self):
		l = []
		current_node = self.head
		while current_node:
			l.append(current_node.data)
			current_node = current_node.next_node
		return l
