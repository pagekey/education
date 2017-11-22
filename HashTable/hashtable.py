INITIAL_CAPACITY = 50

class Node:
	def __init__(self, key, value):
		self.key = key
		self.value = value
		self.next = None

# Hash table with separate chaining (as opposed to open addressed, doubly hashed)
class HashTable:
	def __init__(self):
		self.capacity = INITIAL_CAPACITY
		self.size = 0
		self.buckets = [None]*self.capacity
	#void
	def insert(self, key, value):
		self.size += 1
		index = self.hash(key)
		node = self.buckets[index]
		if node is None:
			self.buckets[index] = Node(key, value)
			return
		# Iterate to the end of the linked list at provided index
		prev = node
		while node is not None:
			prev = node
			node = node.next
		prev.next = Node(key, value)
	#returns value
	def find(self, key):
		index = self.hash(key)
		node = self.buckets[index]
		# Traverse the linked list at this node
		while node is not None and node.key != key:
			node = node.next
		# Now node is either the key or none
		if node is None:
			return None
		else:
			return node.value
	# Return removed object or None if not found
	def remove(self, key):
		index = self.hash(key)
		node = self.buckets[index]
		prev = None
		while node is not None and node.key != key:
			prev = node
			node = node.next
		# node is either the key or none
		if node is None:
			return None
		else: # the key was found
			self.size -= 1
			result = node.value
			# Delete this element in linked list
			if prev is None:
				node = None
			else:
				prev.next = prev.next.next
		return result
	def hash(self, key):
		hashsum = 0
		for idx, c in enumerate(key):
			hashsum += (idx + len(key)) ** ord(c)
			hashsum = hashsum % self.capacity
		return hashsum
