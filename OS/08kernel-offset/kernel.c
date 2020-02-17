void main()
{
	char* mem = (char*) 0xb8000;
	*mem = 'h';
	mem += 2;
	*mem = 'i';
}
