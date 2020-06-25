import ctypes, ctypes.util

def get_char_by_position(string, pos):
	print(f'int is: {clib.atoi(string) - 1 + pos}')
	return pos - 1 + clib.atoi(string)



c_lib_loc = ctypes.util.find_library('c')
clib = ctypes.cdll.LoadLibrary(c_lib_loc)



string = input('Enter flag: ')

str_len = len(string) * 4
if str_len == get_char_by_position(string, 1):
	print('ok')