fn main() {
    let s1 = String::from("Hello, world!");
    println!("{}", first_word(&s1));
    let hello = &s1[0..5];
    let world = &s1[7..12];
    println!("{hello} ha {world}");
    let sliceroo: &str = "hello world";
    println!("sliceroo: {sliceroo}");

    let a = [1,2,3];
    let a_slice: &[i32] = &a[0..1];
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }

    &s[..]
}
