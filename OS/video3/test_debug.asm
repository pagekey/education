bits 16
[org 0x7c00]

	mov ah, 0xe
	mov al, 'h'
	int 0x10
	mov al, 'i'
	int 0x10

	jmp $

	times 510-($-$$) db 0
	dw 0xaa55
