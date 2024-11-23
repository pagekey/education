# Building NOR Gate with Transistors

To import these diagrams, open [Circuit.js](https://www.falstad.com/circuit/circuitjs.html), go to File > Import from Text, and paste the code below. 

## Working Circuit

```
$ 1 0.000005 10.20027730826997 50 5 50 5e-11
R 448 64 448 16 0 0 40 5 0 0 0.5
r 448 128 448 176 0 220
w 448 64 448 128 0
w 448 176 448 208 0
w 448 208 576 208 0
162 576 224 576 288 2 default-led 1 0 0 0.01
g 576 320 576 352 0 0
w 576 208 576 224 0
w 576 288 576 320 0
t 400 416 448 416 0 1 -1.6273119951423136 0.1927921329499834 100 default
w 448 208 448 288 0
w 448 432 448 496 0
g 448 528 448 576 0 0
w 448 496 448 528 0
w 448 128 96 128 0
w 96 128 96 304 0
w 96 304 160 304 0
s 160 304 256 304 0 1 false
r 288 304 352 304 0 1000
w 256 304 288 304 0
w 96 304 96 416 0
w 96 416 160 416 0
s 160 416 256 416 0 1 false
r 304 416 352 416 0 1000
w 256 416 304 416 0
w 352 416 400 416 0
w 416 320 416 528 0
w 416 528 448 528 0
w 448 288 416 288 0
w 448 288 448 400 0
t 368 304 416 304 0 1 -1.627311994271088 0.1927921338212088 100 default
w 352 304 368 304 0
```

## References

Some helpful articles I ran across:

- [NOR from Transistors - Electronics Tutorials](https://www.electronics-tutorials.ws/logic/logic_6.html): Has a helpful diagram that serves as a good starting point.
