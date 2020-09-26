import time

FILE1 = 'append.txt'
FILE2 = 'write.txt'

print('Run this program multiple times to see')
print('the difference between append and write modes')
print('-------------------------------------')

timestamp = time.time()

# Note: print('message', file=f) is the same as f.write('message\n')

with open(FILE1, 'a') as f:
    print(str(timestamp) + ' - wrote to file', file=f)
    print('Wrote to %s in append mode' % FILE1)

with open(FILE2, 'w') as f:
    print(str(timestamp) + ' - wrote to file', file=f)
    print('Wrote to %s in write mode' % FILE2)
