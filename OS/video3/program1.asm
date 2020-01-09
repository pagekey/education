bits 16
[org 0x7c00]
start:
	mov si, string_to_print	; Set up si register for function call
	call print_string	
	mov cx, 0xab12		; Set up cx for function call
	call print_hex
	
	jmp $			; Done

	string_to_print db "I am going to print a hex value: ",0

%include "print_hex.asm"
%include "print_string.asm"

	times 510-($-$$) db 0
	dw 0xaa55
