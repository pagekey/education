# Building AND Gate with Transistors

To import these diagrams, open [Circuit.js](https://www.falstad.com/circuit/circuitjs.html), go to File > Import from Text, and paste the code below. 

## Working Circuit

```
$ 1 0.000005 10.20027730826997 50 5 50 5e-11
R 448 64 448 16 0 0 40 5 0 0 0.5
w 448 64 448 128 0
w 448 176 448 208 0
162 560 368 560 432 2 default-led 1 0 0 0.01
w 560 352 560 368 0
w 560 432 560 464 0
t 400 304 448 304 0 1 -0.26805782364743447 0.6806237291857995 100 default
t 400 416 448 416 0 1 0.5432067315819866 0.6811322640901123 100 default
w 448 208 448 288 0
w 448 320 448 400 0
g 448 528 448 576 0 0
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
r 448 464 448 512 0 220
w 448 432 448 464 0
w 448 512 448 528 0
w 448 128 448 176 0
w 448 464 480 464 0
w 528 352 560 352 0
r 560 464 560 512 0 220
g 560 544 560 576 0 0
w 560 512 560 544 0
w 480 464 528 464 0
w 528 464 528 352 0
```

## References

Some helpful articles I ran across:

- [AND from Transistors - HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Electronic/trangate.html): Has a helpful diagram that serves as a good starting point.
