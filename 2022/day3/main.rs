use std::{collections::HashSet, fs};

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let part1: u32 = input
        .lines()
        .map(|x| x.split_at(x.len() / 2))
        .map(|a| {
            let first = HashSet::<char>::from_iter(a.0.chars());
            let second = HashSet::<char>::from_iter(a.1.chars());
            let intersect = first.intersection(&second);
            let mut sum = 0;
            for letter in intersect {
                sum += match letter {
                    letter @ 'A'..='Z' => *letter as u32 - 38,
                    letter @ 'a'..='z' => *letter as u32 - 96,
                    _ => 0,
                };
            }

            sum
        })
        .sum();

    let mut groups: Vec<[&str; 3]> = vec![];

    let mut group: [&str; 3] = ["", "", ""];
    for (i, line) in input.lines().enumerate() {
        group[i % 3] = line;
        if i > 0 && (i + 1) % 3 == 0 {
            groups.push(group);
        }
    }

    let part2: u32 = groups
        .iter()
        .map(|grp| {
            let a = HashSet::<char>::from_iter(grp[0].chars());
            let b = HashSet::<char>::from_iter(grp[1].chars());
            let c = HashSet::<char>::from_iter(grp[2].chars());

            let a_and_b = a.intersection(&b);
            let mut a_and_b_set = HashSet::new();

            for ch in a_and_b {
                a_and_b_set.insert(*ch);
            }

            let a_and_b_and_c = c.intersection(&a_and_b_set);

            let mut sum = 0;
            for letter in a_and_b_and_c {
                sum += match letter {
                    letter @ 'A'..='Z' => *letter as u32 - 38,
                    letter @ 'a'..='z' => *letter as u32 - 96,
                    _ => 0,
                };
            }

            sum
        })
        .sum();

    print!("part1: {}, part2: {}\n", part1, part2);
}
