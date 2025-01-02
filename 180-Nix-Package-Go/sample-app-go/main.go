package main

import "fmt"
import (
    "github.com/sirupsen/logrus"
)

func main() {
    fmt.Println("Hello, World from Go!")
	logrus.Println("Hello from third-party package!")
    fmt.Println(GetGreeting())
}
