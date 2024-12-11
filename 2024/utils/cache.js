export class Cache {
  #delimiter;
  cache = {};

  constructor(delimiter = "-") {
    this.#delimiter = delimiter;
  }

  #keyGen(...args) {
    return args.join(this.#delimiter);
  }

  withCache = (output, ...args) => {
    let key = this.#keyGen(...args);

    if (this.cache[key]) return this.cache[key];

    let result = typeof output === "function" ? output(...args) : output;

    this.cache[key] = result;
    return result;
  };
}
