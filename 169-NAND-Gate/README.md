# Building NAND Gate with Transistors

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
t 400 304 448 304 0 1 0.6311531684419195 0.6836666750980995 100 default
t 400 416 448 416 0 1 0.6312161577293429 0.6870996414508098 100 default
w 448 208 448 288 0
w 448 320 448 400 0
w 448 432 448 496 0
g 448 528 448 576 0 0
w 448 496 448 528 0
w 448 128 96 128 0
w 96 128 96 304 0
w 96 304 160 304 0
s 160 304 256 304 0 0 false
r 288 304 352 304 0 1000
w 256 304 288 304 0
w 352 304 400 304 0
w 96 304 96 416 0
w 96 416 160 416 0
s 160 416 256 416 0 0 false
r 304 416 352 416 0 1000
w 256 416 304 416 0
w 352 416 400 416 0
```

## Broken Circuit (Wrong Resistor)

```
$ 1 0.000005 10.20027730826997 50 5 50 5e-11
R 448 64 448 16 0 0 40 5 0 0 0.5
r 448 128 448 176 0 1000
w 448 64 448 128 0
w 448 176 448 208 0
w 448 208 576 208 0
162 576 224 576 288 2 default-led 1 0 0 0.01
g 576 320 576 352 0 0
w 576 208 576 224 0
w 576 288 576 320 0
t 400 304 448 304 0 1 0.6324819819037201 0.6624339502693929 100 default
t 400 416 448 416 0 1 0.632402932852448 0.6696578328149366 100 default
w 448 208 448 288 0
w 448 320 448 400 0
w 448 432 448 496 0
g 448 528 448 576 0 0
w 448 496 448 528 0
w 448 128 96 128 0
w 96 128 96 304 0
w 96 304 160 304 0
s 160 304 256 304 0 0 false
r 288 304 352 304 0 1000
w 256 304 288 304 0
w 352 304 400 304 0
w 96 304 96 416 0
w 96 416 160 416 0
s 160 416 256 416 0 0 false
r 304 416 352 416 0 1000
w 256 416 304 416 0
w 352 416 400 416 0
```

## References

Some helpful articles I ran across:

- [NAND from Transistors - Circuit Digest](https://circuitdigest.com/electronic-circuits/how-to-build-nand-logic-gate-using-transistors): Fantastic. Looking carefully at this diagram helped me realize the mistake I was making.
- [NAND from Transistors - Oxford](https://mathcenter.oxford.emory.edu/site/cs170/nandFromTransistors/): Did not seem to work when I built it in Circuit.js. Does not mention which type (NPN or PNP) to use.
