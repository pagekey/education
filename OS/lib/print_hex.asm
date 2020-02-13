print_hex:
	; Print the value of cx register as hex
	pusha
	; print prefix "0x"
	mov ah, 0xe
	mov al, '0'
	int 0x10
	mov ah, 0xe
	mov al, 'x'
	int 0x10
	; Byte 3
	mov ax, cx
	and ax, 0xF000
	shr ax, 12
	call .print_hex_byte
	; Byte 2
	mov ax, cx
	and ax, 0x0F00
	shr ax, 8
	call .print_hex_byte
	; Byte 1
	mov ax, cx
	and ax, 0x00F0
	shr ax, 4
	call .print_hex_byte
	; Byte 0
	mov ax, cx
	and ax, 0x000F
	call .print_hex_byte

; print value in al as hex (number or letter)
; al = value to print (valid: 0x0 to 0xf)
.print_hex_byte:
	; Is this a number or letter?
	cmp al, 0xa
	jl .number
	; If letter:
	add al, 55	; 65 - 10; 'a' - 0xa
	jmp .hex_done
.number: ;If number:
	add al, '0'
.hex_done:
	mov ah, 0xe
	int 0x10
	ret
