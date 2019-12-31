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

	; Check for enter character (carriage return, ASCII 0xD)
	cmp al, 0xd
	jne next	; if not enter, just continue
	int 0x19	; if it IS enter, then reboot!
next:
	jmp start	; Loop forever

	times 510-($-$$) db 0
	dw 0xaa55
