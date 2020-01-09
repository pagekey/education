; cx: hex value to print
print_hex:
	pusha
	; Print prefix "0x"
	mov ah, 0xe
	mov al, '0'
	int 0x10
	mov ah, 0xe
	mov al, 'x'
	int 0x10
	; Print byte 3
	mov ax, cx	; Keep the cx value untouched. Do our work in ax
	and ax, 0xF000	; Select byte 3
	shr ax, 12	; Shift right by 12 (byte 3 now in position 0x000F)
	call print_byte	; Print the byte in lower half of al
	; Print byte 2
	mov ax, cx	; Refresh ax with the original value of cx
	and ax, 0x0F00	; Select next byte over
	shr ax, 8	; Shift
	call print_byte
	; Print byte 1
	mov ax, cx
	and ax, 0x00F0
	shr ax, 4
	call print_byte
	; Print byte 0
	mov ax, cx
	and ax, 0x000F	; No shift required for byte 0
	call print_byte
	popa
	ret

; Print the value in al as hex (number of letter)
; al = value to print (valid: 0x0 to 0xf)
print_byte:
	; Is this a number or a letter?
	cmp al, 0xa
	jl .number
			; If letter:
	add al, 'A'
	sub al, 10	; Remember, A=10
	jmp .hex_done
.number: 		; If number:
	add al, '0'
.hex_done:
	mov ah, 0xe
	int 0x10
	ret
