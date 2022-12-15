class Node(object):
	def __init__(self, d):
		self.data = d
		self.left = None
		self.right = None
	def insert(self, d):
		if self.data == d:
			return False
		elif d < self.data:
			if self.left:
				return self.left.insert(d)
			else:
				self.left = Node(d)
				return True
		else:
			if self.right:
				return self.right.insert(d)
			else:
				self.right = Node(d)
				return True
	def find(self, d):
		if self.data == d:
			return True
		elif d < self.data and self.left:
			return self.left.find(d)
		elif d > self.data and self.right:
			return self.right.find(d)
		return False
	def preorder(self, l):
		l.append(self.data)
		if self.left:
			self.left.preorder(l)
		if self.right:
			self.right.preorder(l)
		return l
	def postorder(self, l):
		if self.left:
			self.left.postorder(l)
		if self.right:
			self.right.postorder(l)
		l.append(self.data)
		return l
	def inorder(self, l):
		if self.left:
			self.left.inorder(l)
		l.append(self.data)
		if self.right:
			self.right.inorder(l)
		return l
		
class BST(object):
	def __init__(self):
		self.root = None
	# return True if successfully inserted, false if exists
	def insert(self, d):
		if self.root:
			return self.root.insert(d)
		else:
			self.root = Node(d)
			return True
	# return True if d is found in tree, false otherwise
	def find(self, d):
		if self.root:
			return self.root.find(d)
		else:
			return False
	# return True if node successfully removed, False if not removed
	def remove(self, d):
		# Case 1: Empty Tree?
		if self.root == None:
			return False
		
		# Case 2: Deleting root node
		if self.root.data == d:
			# Case 2.1: Root node has no children
			if self.root.left is None and self.root.right is None:
				self.root = None
				return True
			# Case 2.2: Root node has left child
			elif self.root.left and self.root.right is None:
				self.root = self.root.left
				return True
			# Case 2.3: Root node has right child
			elif self.root.left is None and self.root.right:
				self.root = self.root.right
				return True
			# Case 2.4: Root node has two children
			else:
				moveNode = self.root.right
				moveNodeParent = self.root
				while moveNode.left:
					moveNodeParent = moveNode
					moveNode = moveNode.left
				self.root.data = moveNode.data
				if moveNode.data < moveNodeParent.data:
					moveNodeParent.left = None
				else:
					moveNodeParent.right = None
				return True		
		# Find node to remove
		parent = None
		node = self.root
		while node and node.data != d:
			parent = node
			if d < node.data:
				node = node.left
			elif d > node.data:
				node = node.right
		# Case 3: Node not found
		if node == None or node.data != d:
			return False
		# Case 4: Node has no children
		elif node.left is None and node.right is None:
			if d < parent.data:
				parent.left = None
			else:
				parent.right = None
			return True
		# Case 5: Node has left child only
		elif node.left and node.right is None:
			if d < parent.data:
				parent.left = node.left
			else:
				parent.right = node.left
			return True
		# Case 6: Node has right child only
		elif node.left is None and node.right:
			if d < parent.data:
				parent.left = node.right
			else:
				parent.right = node.right
			return True
		# Case 7: Node has left and right child
		else:
			moveNodeParent = node
			moveNode = node.right
			while moveNode.left:
				moveNodeParent = moveNode
				moveNode = moveNode.left
			node.data = moveNode.data
			if moveNode.right:
				if moveNode.data < moveNodeParent.data:
					moveNodeParent.left = moveNode.right
				else:
					moveNodeParent.right = moveNode.right
			else:
				if moveNode.data < moveNodeParent.data:
					moveNodeParent.left = None
				else:
					moveNodeParent.right = None
			return True
	# return list of data elements resulting from preorder tree traversal
	def preorder(self):
		if self.root:
			return self.root.preorder([])
		else:
			return []
	# return list of postorder elements
	def postorder(self):
		if self.root:
			return self.root.postorder([])
		else:
			return []
	# return list of inorder elements
	def inorder(self):
		if self.root:
			return self.root.inorder([])
		else:
			return []
