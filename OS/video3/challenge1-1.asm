BITS 16
[org 0x7c00]
start:
	; Call read character
	mov ah, 0x0
	int 0x16
	
	; Call print character
	mov ah, 0x0e
	; al should already have the returned character
	int 0x10
	
	jmp start	; Loop forever

	times 510-($-$$) db 0
	dw 0xaa55
