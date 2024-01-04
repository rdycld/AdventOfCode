use std::{cmp, fs};

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let pairs = input
        .lines()
        .map(|l| {
            l.split(',')
                .map(|x| {
                    x.split('-')
                        .map(|v| v.parse::<i32>().unwrap())
                        .collect::<Vec<i32>>()
                })
                .collect::<Vec<_>>()
        })
        .collect::<Vec<Vec<_>>>();

    let mut sum = 0;
    let mut sum2 = 0;
    for pair in &pairs {
        let first = pair.get(0).unwrap();
        let second = pair.get(1).unwrap();

        let f_start = first.get(0).unwrap();
        let f_end = first.get(1).unwrap();
        let s_start = second.get(0).unwrap();
        let s_end = second.get(1).unwrap();

        if (f_start <= s_start && f_end >= s_end) || (s_start <= f_start && s_end >= f_end) {
            sum += 1
        }

        if cmp::min(f_end, s_end) >= cmp::max(f_start, s_start) {
            sum2 += 1;
        }
    }

    println!("part1: {}", sum);
    println!("part2: {}", sum2);
}
