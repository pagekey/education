all: os-image.bin

run: all
	qemu-system-i386 build/os-image.bin
clean:
	rm -rf build

kernel.o:
	gcc -ffreestanding -c kernel/kernel.c -o build/kernel.o
kernel.bin: kernel.o
	ld -o build/kernel.bin -Ttext 0x1000 build/kernel.o --oformat binary
os-image.bin: boot.bin kernel.bin
	cat build/boot.bin build/kernel.bin > build/os-image.bin

boot.bin:
	nasm -fbin boot/boot.asm -o build/boot.bin
