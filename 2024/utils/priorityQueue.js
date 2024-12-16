export class PriorityQueue {
  #queue = new Map();

  push(v, p) {
    let list = this.#queue.get(p);

    if (list) {
      list.push(v);
    } else {
      this.#queue.set(p, [v]);
    }
  }

  pop() {
    let maxP = Math.min(...this.#queue.keys());

    if (maxP === Infinity) return undefined;

    let list = this.#queue.get(maxP);
    let v = list.pop();

    if (list.length === 0) this.#queue.delete(maxP);

    return v;
  }

  get length() {
    let l = 0;

    for (let list of this.#queue.values()) {
      l += list.length;
    }

    return l;
  }
}
