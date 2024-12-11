export class Queue {
  #values = [];
  #leftPointer = 0;

  add(value) {
    this.#values.push(value);
  }

  pop() {
    if (this.#leftPointer === this.#values.length - 1)
      return this.#values[this.#leftPointer];
    return this.#values[this.#leftPointer++];
  }

  peek() {
    return this.#values[this.#leftPointer];
  }
}