all:
	nasm -f bin diskread.asm -o boot.bin
	qemu-system-i386 boot.bin
