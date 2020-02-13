; Arguments:
; bx = addr of first char of string to print
print_string:
	pusha
	mov ah, 0xe
.print_string_loop:
	mov al, byte [bx]
	int 0x10
	inc bx
	cmp al, 0
	jne .print_string_loop
	popa
	ret
