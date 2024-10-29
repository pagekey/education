fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of {} is {}", s1, len);

    let mut s = String::from("Hello");
    change(&mut s);
    println!("{}",s);

    let r1 = &mut s;
    let r2 = &mut s;
    // println!("{}, {}", r1, r2);

    let ref_to_something = no_dangle();
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s
// }

fn no_dangle() -> String {
    let s = String::from("hello");
    s
}
