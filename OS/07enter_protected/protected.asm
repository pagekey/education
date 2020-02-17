bits 16
[org 0x7c00]

	call enter_protected
	
	jmp $
	
	%include "../lib/gdt.asm"
	%include "../lib/enter_protected.asm"

[bits 32]
pm_start:
	; Print a character
	mov ah, 0x0F
	mov al, 'h'
	mov [0xb8000], ax
	mov al, 'i'
	mov [0xb8002], ax
	jmp $

	times 510-($-$$) db 0
	dw 0xaa55
