use std::fs;

//         [H]     [W] [B]
//     [D] [B]     [L] [G] [N]
// [P] [J] [T]     [M] [R] [D]
// [V] [F] [V]     [F] [Z] [B]     [C]
// [Z] [V] [S]     [G] [H] [C] [Q] [R]
// [W] [W] [L] [J] [B] [V] [P] [B] [Z]
// [D] [S] [M] [S] [Z] [W] [J] [T] [G]
// [T] [L] [Z] [R] [C] [Q] [V] [P] [H]
//  1   2   3   4   5   6   7   8   9

fn rearrange(cargo: &mut Vec<Vec<char>>, instructions: &String, reverse: bool) -> String {
    for line in instructions.lines() {
        let [how_many, from, to] = match line.split(' ').collect::<Vec<_>>().as_slice() {
            [_, how_many, __, from, ___, to] => [
                how_many.parse::<usize>().unwrap(),
                from.parse::<usize>().unwrap() - 1,
                to.parse::<usize>().unwrap() - 1,
            ],
            _ => unreachable!(),
        };

        let mut slice: Vec<char> = vec![];

        for _ in 0..how_many {
            slice.push(cargo[from].pop().unwrap())
        }

        if reverse {
            cargo[to].extend(slice.iter().rev());
        } else {
            cargo[to].extend(slice.iter());
        }
    }
    let mut top: Vec<char> = vec![];
    for stack in cargo.iter_mut() {
        top.push(stack.pop().unwrap())
    }
    String::from_iter(top)
}

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let mut stacks = vec![
        vec!['T', 'D', 'W', 'Z', 'V', 'P'],
        vec!['L', 'S', 'W', 'V', 'F', 'J', 'D'],
        vec!['Z', 'M', 'L', 'S', 'V', 'T', 'B', 'H'],
        vec!['R', 'S', 'J'],
        vec!['C', 'Z', 'B', 'G', 'F', 'M', 'L', 'W'],
        vec!['Q', 'W', 'V', 'H', 'Z', 'R', 'G', 'B'],
        vec!['V', 'J', 'P', 'C', 'B', 'D', 'N'],
        vec!['P', 'T', 'B', 'Q'],
        vec!['H', 'G', 'Z', 'R', 'C'],
    ];

    let p1 = rearrange(&mut stacks.clone(), &input, false);

    let p2 = rearrange(&mut stacks, &input, true);

    println!("part1: {} \n part2: {}", p1, p2);
}
