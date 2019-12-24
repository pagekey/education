BITS 16
[org 0x7c00]

start:
	mov ah, 0x0e		; ah=0x0e, int 0x10 is the 'print char' BIOS call
	mov si, text_string	; Move the address of text_string into si, the source index register
next_char:			; Jump here when there's another character
	mov al, [si]		; Move the character at the address in SI into AL for printing
	int 0x10		; Call print char

	inc si			; Increment SI to move onto the next character
	cmp al, 0		; Compare al to 0 to see if we are at the end of the string
	jne next_char		; Not equal to 0 yet? Go again - jump to next_char label

	jmp $			; Jump to this memory location. In other words, hang and do nothing.

	text_string db 'Hello World!',0		; Put our string in memory

	times 510-($-$$) db 0	; Pad remainder of boot sector with 0s
	dw 0xAA55		; The standard PC boot signature
