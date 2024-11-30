const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

fn main() {
    let mut x = 5;
    println!("Value of x is {x}");
    x = 6;
    println!("Value of x is {x}");
    println!("Constant: {THREE_HOURS_IN_SECONDS}");

    let x = 5;
    println!("x is {x}");
    let x = 6;
    println!("x is {x}");
    {
        let x = x * 2;
        println!("x is {x}");
    }
    println!("x is {x}");
    let spaces = "                ";
    println!("spaces is {spaces}");
    let spaces = spaces.len();
    println!("spaces is {spaces}");
}
