#include "../drivers/port.h"

void main()
{
	char* mem = (char*) 0xb8000;
	*mem = 'h';
	mem += 2;
	*mem = 'i';
  port_byte_in((unsigned short) 0);
}


