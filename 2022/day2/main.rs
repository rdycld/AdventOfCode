use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();
    /*
    A rock
    B paper
    C scissor
    X rock
    Y paper
    Z scis
     */

    let part1: usize = input
        .lines()
        .map(|x| match x {
            "A X" => 4,
            "A Y" => 8,
            "A Z" => 3,
            "B X" => 1,
            "B Y" => 5,
            "B Z" => 9,
            "C X" => 7,
            "C Y" => 2,
            "C Z" => 6,
            _ => panic!(""),
        })
        .sum();

    let part2: usize = input
        .lines()
        .map(|x| match x {
            "A X" => 3,
            "A Y" => 4,
            "A Z" => 8,
            "B X" => 1,
            "B Y" => 5,
            "B Z" => 9,
            "C X" => 2,
            "C Y" => 6,
            "C Z" => 7,
            _ => panic!(""),
        })
        .sum();
    print!("part1: {}, part2: {}", part1, part2);
}
