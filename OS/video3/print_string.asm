; si = string address to print
print_string:
	pusha		; Preserve registers
	mov ah, 0xe	; ah=0xe: print char BIOS call
.next_char:
	mov al, [si]	; Move the character at the address of si into al
	cmp al, 0x0	; Are we at the end of the string?
	je .string_done	; if so, jump to .string_done
	int 0x10	; else, print the character
	inc si		; Move to next character memory location
	jmp .next_char	; Loop
.string_done:
	popa		; Restore registers
	ret		; Return
