bits 16
[org 0x7c00]
start:
	; switch mode
	mov ah, 0x0
	mov al, 0x13 ; VGA mode
	int 0x10
	
	; Initial position value
	mov cx, 0	
	; write graphics pixel
	mov ah, 0x0c
	mov al, 0x4 	; Pixel color: red
	mov bh, 0x0	; Page number 
	mov dx, 0x0	; Row 
graphics:
	int 0x10

	; Increment position and put back on stack
	inc cx		; Column
	
	; Do it all again
	jmp graphics

	times 510-($-$$) db 0
	dw 0xaa55
