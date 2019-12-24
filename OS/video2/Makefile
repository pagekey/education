all:
	nasm -f bin first.asm -o first.bin
	qemu-system-i386 first.bin
iso:
	dd if=/dev/zero of=floppy.img bs=1024 count=1440
	dd if=boot.bin of=floppy.img seek=0 count=1 conv=notrunc
	mkdir -p iso
	cp floppy.img iso
	genisoimage -quiet -V 'PKOS' -input-charset iso8859-1 -o pkos.iso -b floppy.img -hide floppy.img iso
