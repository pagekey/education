from doubly_linked_list import DoublyLinkedList, Node
from test_linked_list import TestLinkedList

# We will extend the LinkedList tester, since most of the functionality is the same
class TestDoublyLinkedList(TestLinkedList):
	# Override
	def setUp(self):
		self.test_list = DoublyLinkedList()
	def test_delete_node(self):
		first = self.test_list.add(3)
		second = self.test_list.add(2)
		self.assertEqual(2, self.test_list.size)
		self.test_list.remove_node(first)
		self.assertEqual(1, self.test_list.size)
		self.test_list.remove_node(second)
		self.assertEqual(0, self.test_list.size)
