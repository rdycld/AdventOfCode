use std::{collections::VecDeque, fs, str::FromStr};

#[derive(Debug)]
struct Tree {
    name: String,
    size: usize,
    nodes: Vec<Tree>,
}

impl Tree {
    fn get_node_by_name_mut(&mut self, name: &str) -> Option<&mut Tree> {
        for node in &mut self.nodes {
            if node.name == name {
                return Some(node);
            }
        }

        None
    }

    fn add_node(&mut self, node: Tree, path: &Vec<&str>) {
        self.size += node.size;

        let mut curr_node = self;
        let mut p = VecDeque::from(path.clone());

        while p.len() > 0 {
            let next_node_name = p.pop_front().unwrap();
            curr_node = curr_node.get_node_by_name_mut(next_node_name).unwrap();
            curr_node.size += node.size;
        }

        curr_node.nodes.push(node);
    }

    fn part_1(&self, size: usize) -> usize {
        if self.size < size {
            return self.size;
        }

        let mut q: VecDeque<&Tree> = VecDeque::from_iter(self.nodes.iter());

        let mut sum = 0;
        while q.len() > 0 {
            let node = q.pop_front().unwrap();

            if node.nodes.len() == 0 {
                continue;
            }

            if node.size <= size {
                sum += node.size
            }

            for n in &node.nodes {
                q.push_back(n)
            }
        }

        sum
    }

    fn part_2(&self) -> usize {
        let total_memory = 70_000_000;
        let min_space = 30_000_000 - (total_memory - self.size);

        let mut q: VecDeque<&Tree> = VecDeque::from_iter(self.nodes.iter());

        let mut deletable_dirs: Vec<usize> = vec![];

        while q.len() > 0 {
            let node = q.pop_front().unwrap();

            if node.nodes.len() == 0 {
                continue;
            }

            if node.size >= min_space {
                deletable_dirs.push(node.size);
            }

            for n in &node.nodes {
                q.push_back(n)
            }
        }

        deletable_dirs.sort();
        deletable_dirs.get(0).unwrap().clone()
    }
}

fn build_tree(tree: &mut Tree, input: String) {
    let mut path: Vec<&str> = vec![];

    for l in input.lines() {
        let line: Vec<&str> = l.split(" ").collect();

        let second = *line.get(1).unwrap();
        let third = match line.get(2) {
            Some(val) => val,
            _ => "",
        };

        match *line.get(0).unwrap() {
            "$" => {
                if second != "cd" {
                    continue;
                }

                if third == ".." {
                    path.pop();
                } else {
                    path.push(third);
                }
            }
            "dir" => tree.add_node(
                Tree {
                    name: String::from_str(second).unwrap(),
                    nodes: vec![],
                    size: 0,
                },
                &path,
            ),
            _ => tree.add_node(
                Tree {
                    size: line.get(0).unwrap().parse::<usize>().unwrap(),
                    name: String::from_str(second).unwrap(),
                    nodes: vec![],
                },
                &path,
            ),
        };
    }
}

fn main() {
    let input = fs::read_to_string("./input.txt").unwrap();

    let mut tree = Tree {
        name: String::from(""),
        size: 0,
        nodes: vec![],
    };
    build_tree(&mut tree, input);

    println!("part1: {}", tree.part_1(100_000));
    println!("part2: {}", tree.part_2());
}
