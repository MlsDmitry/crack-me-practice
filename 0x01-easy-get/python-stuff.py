input_string = 'Enter password'


for char in input_string:
	code = ord(char)
	print(hex(code)[2:], end=' ')
else:
	print()