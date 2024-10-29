import unittest
from challenges import *

class TestChallenges(unittest.TestCase):
	def test_reverse(self):
		self.assertEqual("yeH", reverse("Hey"))
		self.assertEqual("", reverse(""))
		self.assertEqual("54321", reverse("12345"))
	def test_eval_postfix(self):
		self.assertEqual(5, eval_postfix("32+"))
		self.assertEqual(56, eval_postfix("53+7*"))
		self.assertEqual(6, eval_postfix("45*2/5/3*"))
		self.assertEqual(12, eval_postfix("223**"))
