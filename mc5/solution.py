serial = '102 50 104 119 108 100 111 122 103 124 58 119 98 113'

i = 0
for char_code in serial.split():
	i += 1
	print(int(char_code) - i, end=' ')

print()

