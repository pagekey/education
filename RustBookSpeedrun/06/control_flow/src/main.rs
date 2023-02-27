fn main() {
    let number = 7;

    if number < 5 {
        println!("lt5");
    } else {
        println!("NOT lt5");
    }
    
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("number is {number}");

    let mut i = 0;
    let a = 'looperino: loop {
        println!("helllo");
        if i == 2 { break 'looperino 314 }
        i += 1;
    };
    println!("a is {a}");

    let abc = ['a', 'b', 'c'];
    for character in abc {
        println!("The character is {character}");
    }
}
