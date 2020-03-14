bits 16
[org 0x7c00]
KERNEL_OFFSET equ 0x1000	; Memory location we will load our kernel to

	mov bx, MSG_REAL_MODE
	call print_string

	; Load the kernel into memory from disk
	mov al, 1	; Load 1 sector (adjust for kernel size)
	; NOTE: Attempting to load too many sectors causes disk error in qemu
	mov bx, 0x0
	mov es, bx
	mov bx, KERNEL_OFFSET	; Target memory location of kernel
	call disk_read

	mov bx, MSG_PROTECTED_MODE
	call print_string

	call enter_protected

	jmp $

	%include "boot/print_string.asm"
	%include "boot/disk_read.asm"
	%include "boot/gdt.asm"
	%include "boot/enter_protected.asm"

[bits 32]
pm_start:
	; Move execution into our actual kernel code by calling the memory location
	call KERNEL_OFFSET
	jmp $

MSG_REAL_MODE db "OS started in 16-bit real mode.",0
MSG_PROTECTED_MODE db "Entering protected mode...",0

	times 510-($-$$) db 0
	dw 0xaa55
