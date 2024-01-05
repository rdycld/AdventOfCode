use std::{collections::HashSet, fs};

fn find_marker(data: &String, marker_len: usize) -> usize {
    let mut val = 0;
    for i in 0..data.len() {
        let slice = &data[i..i + marker_len];
        let set = HashSet::<char>::from_iter(slice.chars());
        if set.len() == marker_len {
            print!("{}", i + marker_len);
            val = i + marker_len;
            break;
        }
    }
    val
}
fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let p1 = find_marker(&input, 4);
    let p2 = find_marker(&input, 14);

    println!("part1: {}", p1);
    println!("part2: {}", p2);
}
