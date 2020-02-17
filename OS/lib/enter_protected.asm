; Enter protected mode
; Jump to pm_start when complete
; Assumptions:
; * CODE_SEG is defined in gdt.asm 
; * gdt_descriptor and the GDT itself have been included
; * pm_start is a valid label in 32-bit assembly code
enter_protected:
	; Clear screen by switching to text mode (while we still have BIOS)
	mov ah, 0x0
	mov al, 0x3
	int 0x10

	; Disable interrupts
	cli
	; Load GDT
	lgdt [gdt_descriptor]

	; Switch to PM by setting control register cr0 (use eax b/c cannot set cr0 directly)
	mov eax, cr0
	or eax, 0x1
	mov cr0, eax

	; Perform a far jump to flush CPU pipeline
	jmp CODE_SEG:pm_start
