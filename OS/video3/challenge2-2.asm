bits 16
[org 0x7c00]
start:
	; Switch mode 
	mov ah, 0x0
	mov al, 0x3 ; text mode 80x25 16 colors
	int 0x10

	; Enable cursor
	mov ah, 0x1
	mov ch, 0x0
	mov cl, 0xf
	int 0x10
	; Move cursor to col 39, row 12
	mov ah, 0x2
	mov bh, 0x0
	mov dh, 12 
	mov dl, 39
	int 0x10

	; Say hi
	mov ah, 0x0e
	mov al, 'h'
	int 0x10
	mov al, 'i'
	int 0x10

	jmp $

	times 510-($-$$) db 0
	dw 0xaa55
