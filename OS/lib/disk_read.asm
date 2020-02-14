; disk_read.asm
; Dependencies:
; print_string.asm

; Arguments:
; al = number of sectors to read
; dl = drive number
; es:bx = memory location to copy into
disk_read:
	push ax		; Push number of sectors REQUESTED for checking later
	mov ah, 0x2	; Disk read
	mov cl, 0x2	; Sector (0x1=boot, 0x2=first avail)
	mov ch, 0x0	; Cylinder
	; dl = drive number (may be set by qemu)
	; 0=floppy, 1=floppy2, 0x80=hdd, 0x81=hdd2
	mov dh, 0x0	; Head number

	int 0x13	; Call disk read
	jc .disk_error

	pop bx
	cmp al, bl
	jne .sector_error 
	ret

.disk_error:
	mov bx, MSG_DISK_ERROR
	call print_string
	jmp $
.sector_error:
	mov bx, MSG_SECTOR_ERROR
	call print_string
	jmp $

MSG_DISK_ERROR: db "Error reading disk.",0
MSG_SECTOR_ERROR: db "Error: wrong number of sectors.",0
