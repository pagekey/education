bits 16
[org 0x7c00]
start:
	; switch mode
	mov ah, 0x0
	mov al, 0x13 ; VGA mode
	int 0x10
	
	; Push initial position value
	push 0
graphics:
	; write graphics pixel
	mov ah, 0x0c
	mov al, 0x4	; Pixel color: red	
	mov bh, 0x0	; Page number	
	pop cx		; Column
	mov dx, 0	; Row
	int 0x10

	; Increment position and put back on stack
	inc cx
	push cx
	
	; Call wait
	mov ah, 0x86
	; 1/30 sec = 30,000 microsec = 0x7530
	mov cx, 0x0
	mov dx, 0x7530
	int 0x15
	
	; Do it all again
	jmp graphics

	times 510-($-$$) db 0
	dw 0xaa55
