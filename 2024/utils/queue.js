export class Queue {
  #values = [];
  #leftPointer = 0;

  add(value) {
    this.#values.push(value);
  }

  pop() {
    if (this.#leftPointer === this.#values.length - 1) {
      let v = this.#values[this.#leftPointer];
      this.#values = [];
      this.#leftPointer = 0
      return v
    }

    return this.#values[this.#leftPointer++];
  }

  peek() {
    return this.#values[this.#leftPointer];
  }

  get length() {
    return this.#values.length - this.#leftPointer;
  }
}
