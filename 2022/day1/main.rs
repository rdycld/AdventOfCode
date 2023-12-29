use std::fs;

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let mut total: Vec<u32> = vec![];

    let mut sum = 0;
    for line in input.lines() {
        if line == "" {
            total.push(sum);
            sum = 0;
        } else {
            sum += line.parse::<u32>().unwrap();
        }
    }
    total.sort_by(|a, b| b.cmp(a));

    let max = total[0];
    let max3: u32 = total.iter().take(3).sum();

    print!("part1: {max}");
    print!("part2: {max3}");
}
