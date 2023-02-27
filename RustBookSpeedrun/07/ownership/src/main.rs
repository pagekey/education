fn main() {
    let mut s = String::from("hello");
    s.push_str("lklkjlkj");
    println!("{}", s);
    drop(s);

    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}, world", s2);

    let s3 = String::from("hello");
    let s4 = s3.clone();
    println!("{}, world", s3);

    let s5 = String::from("hi there");
    takes_ownership(s5);
    
    let x = 5;
    makes_copy(x);
    println!("{}",x);
}

fn takes_ownership(some_string: String) {
    println!("took ownership of {some_string}");
}
fn makes_copy(some_integer: i32) {
    println!("made copy of {some_integer}");
}