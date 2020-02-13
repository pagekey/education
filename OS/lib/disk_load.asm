; Dependencies:
; print_string.asm

; Arguments:
; dh = number of sectors
; dl = drive number
; es:bx = memory location to copy into
disk_load:
	mov ah, dh	; Read Sector
;	mov dl, 0x0	; Read drive 0 (default)
	mov ch, 0x0	; Cylinder
	mov dh, 0x0	; Head
	mov cl, 0x2	; Start sector (skip bootloader)
	mov al, 0x1	; Number of sectors to read

	int 0x13

	jc .disk_error	; Carry flag indicates error
	cmp dh, al	; if AL != DH, error
	jne .sector_error
	ret

.disk_error:
	mov bx, DISK_ERROR
	call print_string
	jmp $
.sector_error:
	mov bx, SECTOR_ERROR
	call print_string
	jmp $

DISK_ERROR: "Error: disk error.",0
SECTOR_ERROR: "Error: read wrong number of sectors.",0
