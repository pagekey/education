#define VIDEO_ADDRESS 0xb8000
#define MAX_ROWS 25
#define MAX_COLS 80
// Default color:
#define WHITE_ON_BLACK 0x0f

// Screen Device I/O Ports
#define REG_SCREEN_CTRL 0x3d4
#define REG_SCREEN_DATA 0x3d5

int get_cursor();
void set_cursor(int offset);
void print_char(char character, int col, int row, char attribute_byte);  
void print_at(char* message, int col, int row);
void print(char* message);
