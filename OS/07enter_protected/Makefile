all: boot.bin
run: all
	qemu-system-i386 boot.bin
clean:
	rm *.bin
boot.bin:
	nasm -fbin protected.asm -o boot.bin
