all: os-image.bin

run: all
	qemu-system-i386 os-image.bin
clean:
	rm *.o *.bin

boot.bin:
	nasm -fbin boot.asm -o boot.bin
kernel.o:
	gcc -ffreestanding -c kernel.c -o kernel.o
kernel.bin: kernel.o
	ld -o kernel.bin -Ttext 0x1000 kernel.o --oformat binary
os-image.bin: boot.bin kernel.bin
	cat boot.bin kernel.bin > os-image.bin
