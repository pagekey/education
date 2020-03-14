
// Get cursor location from VGA device
// Returns int representing number of character cells (not chars)
int get_cursor() {
  // reg 14: high byte of cursor offset
  // reg 15: low byte of cursor offset
  // Select register, then read or write a byte to the register
  port_byte_out(REG_SCREEN_CTRL, 14); // select reg 14
  int offset = port_byte_in(REG_SCREEN_DATA) << 8; // answer: offset because this is the HIGH 8 bytes of the value
  port_byte_out(REG_SCREEN_CTRL, 15); // select reg 15
  offset += port_byte_in(REG_SCREEN_DATA); // Add the low byte
  // Cursor offset reported by VGA hardware is number of chars
  // Don't forget the attribute byte! Mult by 2 to get char cells
  return offset * 2;
}

void set_cursor(int offset) {
  offset /= 2; // Convert back to chars rather than chars + attrib bytes
  // TODO finish impl
}

// Print a character on the screen at col,row or at the cursor position
void print_char(char character, int col, int row, char attribute_byte) {
  // Create pointer to video memory
  unsigned char *vidmem = (unsigned char *) VIDEO_ADDRESS;

  // Apply default style if attribute byte is zero
  if (!attribute_byte) {
    attribute_byte = WHITE_ON_BLACK;
  }

  // Get vid mem offset for screen location
  int offset;
  // If col and row are non-negative, use them
  if (col >= 0 && row >= 0) {
    offset = get_screen_offset(col, row);
  // Otherwise, get the current cursor position
  } else {
    offset = get_cursor(); 
  }

  // TODO: Write get_offset(col, row), get_row(offset), get_col(offset)
  // For newline character, move to next row
  if (character == '\n') {
    int rows = offset / (2*MAX_COLS);
    offset = get_screen_offset(79, rows);
  } else {
    vidmem[offset] = character;
    vidmem[offset+1] = attribute_byte;
  }
  offset += 2;
  // Make scrolling adjustment for bottom of screen
  offset = handle_scrolling(offset);
  // Update the cursor position on the screen device
  set_cursor(offset);
}

void print_at(char* message, int col, int row) {
  // If col/row are valid, update cursor
  if (col >= 0 && row >= 0) {
    set_cursor(get_screen_offset(col, row));
  }
  // Loop through each char and print it
  int i = 0;
  while (message[i] != 0) {
    print_char(message[i++], col, row, WHITE_ON_BLACK);
  }
}

void print(char* message) {
  print_at(message, -1, -1);
}
