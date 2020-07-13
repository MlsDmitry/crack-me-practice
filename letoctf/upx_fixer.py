from elftools.elf.elffile import ELFFile
import elftools
from capstone import *

with open('task1', 'rb') as f:
    e = ELFFile(f)
    # code = e.get_segment('LOAD')
    for seg in e.iter_segments():
        print(seg.header)
        # addr = code['sh_addr']
        # md = Cs(CS_ARCH_X86, CS_MODE_64)
        # for i in md.disasm(ops, addr):
        #     print(f'0x{i.address:x}:\t{i.mnemonic}\t{i.op_str}')
    # ops = code.data()
    # addr = code['sh_addr']
    # md = Cs(CS_ARCH_X86, CS_MODE_64)
    # for i in md.disasm(ops, addr):
    #     print(f'0x{i.address:x}:\t{i.mnemonic}\t{i.op_str}')