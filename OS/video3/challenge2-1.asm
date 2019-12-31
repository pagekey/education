bits 16
[org 0x7c00]
start:
	; Switch mode 
	mov ah, 0x0
	mov al, 0x3 ; text mode 80x25 16 colors
	int 0x10

	jmp $

	times 510-($-$$) db 0
	dw 0xaa55
