bits 16
[org 0x7c00]
	mov al, 0x2	; number of sectors: 2

	mov bx, 0x0 	; read memory es:bx
	mov es, bx	; 0x0:0x9000 = 0x9000
	mov bx, 0x9000

	call disk_read

	mov bx, STR1
	call print_string

	; Print out the character at location read from disk
	mov ah, 0xe
	mov al, [0x9200]
	int 0x10
	jmp $

	%include "../lib/print_string.asm"
	%include "../lib/disk_read.asm"

	STR1: db "Reading from 0x9200: ",0

	times 510-($-$$) db 0
	dw 0xaa55

times 512 db 'f'
times 512 db 'x'
