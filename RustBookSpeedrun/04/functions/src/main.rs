fn fiveFunc() -> i32 {
    5
}

fn main() {
    another_function(5);
    let y = {
        let x = 3;
        x + 1
    };
    println!("y is {y}");
    let five = fiveFunc();
    println!("five is {five}")
}

fn another_function(x: i32) {
    println!("The value of x is {x}");
}