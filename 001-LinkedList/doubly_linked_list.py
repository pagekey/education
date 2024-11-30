from linked_list import LinkedList

# For the Doubly Linked List, we have a new Node to use
# It contains a prev_node reference
class Node(object):
	def __init__(self, d):
		self.next_node = None
		self.prev_node = None
		self.data = d

# Advantage: prev_node allows efficient iteration in reverse
# Advantage: Some operations easier to implement (i.e. deletion, see below)
# Disadvantage: Takes extra memory (negligible) for prev_node pointer
class DoublyLinkedList(LinkedList):
	# For remove_node, we are provided with a Node object reference
	# This allows us to obtain the prev_node and next_node in one fell swoop
	# No iteration required
	def remove_node(self, node):
		if node is None:
			return False
		previous = node.prev_node
		if previous is None:
			node = node.next_node
		else:
			previous.next_node = node.next_node
		self.size -= 1
		return True

	# redefine add to return a node object
	def add(self, d):
		new_node = Node(d)
		if self.tail:
			self.tail.next_node = new_node
			self.tail = new_node
		else:
			self.head = new_node
			self.tail = new_node
		self.size += 1
		# This is the only different line
		return new_node
