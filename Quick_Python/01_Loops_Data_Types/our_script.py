#!/usr/bin/env python

print("Hello world!")

# str: Strings are just a sequence of characters
my_str = "I love PageKey"

# Numeric Types
# int: An integer (no decimal places / no fractional component)
my_int = 3
# float: floating point number - has decimal places
my_float = 3.14159
# complex: Complex numbers. Remember this from high school?
my_complex = 1+2j

# Sequence Types
# list: just what it sounds like
my_list = [1, 2, 3, "yesiree"]
# tuple: immutable, ordered collection
my_tuple = (3, 4) # could be coordinates or anything really

# Mapping type
# dict: Map keys to values - it's a hash table!
my_dict = {
        "name": "Jim",
        "occupation": "teacher",
}

# Other types
# set, frozenset, bool, bytes, bytearray, memoryview

# Let's define a list containing all the variables we defined above
all_of_my_data = [my_str, my_int, my_float, my_complex, my_list, my_tuple, my_dict]

for elem in all_of_my_data:
    print("Here's a bit of data for you:")
    print(elem)

print("That's it for this program!")
