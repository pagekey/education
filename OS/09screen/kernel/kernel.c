unsigned char port_byte_in(unsigned short port);
void print_char(char c, char attributes);

void main()
{
	char* mem = (char*) 0xb8000;
	*mem = 'h';
	mem += 2;
	*mem = 'i';
  port_byte_in(0);
  int *offset = (int*)0x2000;
  *offset = 0;
  print_char('c', (char) 0xf);
}

void print_char(char c, char attributes) {
  char* mem = (char*) 0xb8000;
  mem = mem + *(int*)(0x2000);
  *mem = c;
  //*(++mem) = c;
}

unsigned char port_byte_in(unsigned short port) {
  unsigned char result;
  __asm__("in %%dx, %%al" : "=a" (result) : "d" (port));
  return result;
}
unsigned char port_byte_out(unsigned short port, unsigned char data) {
  __asm__("out %%al, %%dx" : :"a" (data), "d" (port));
}
