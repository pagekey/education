from stack import Stack

# Reverse string s
def reverse(s):
	my_stack = Stack()
	# For each character in string s
	for c in s:
		my_stack.push(c)
	result = ""
	while not my_stack.is_empty():
		result += my_stack.pop()
	return result

# Evaluate a postfix string
# Assume a well-formed input
def eval_postfix(postfix_expr):
	stack = Stack()
	for c in postfix_expr:
		if c=='+' or c=='-' or c=='*' or c=='/':
			# We have an operator!
			# Pop two operands
			operand_right = stack.pop()
			operand_left = stack.pop()
			result = None
			if c=='+':
				result = operand_left + operand_right
			elif c=="-":
				result = operand_left - operand_right
			elif c=='*':
				result = operand_left * operand_right
			else:
				result = operand_left / operand_right
			stack.push(result)
		else:
			# We have an operand!
			# Convert to floating point number and push
			stack.push(float(c))
	# At this point, the only thing in the stack should be the answer
	answer = stack.pop()
	return answer
