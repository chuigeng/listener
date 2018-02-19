class ListenerPool {

  constructor() {
    this.pool = new Map();
  }

  add(listener) {
    if (this.pool.has(listener.getName())) {
      throw new Error(`已存在名为 ${listener.getName()} 的 listener`);
    }
    this.pool.set(listener.getName(), listener);
  }

  remove(listener) {
    this.pool.delete(listener.getName());
  }

  has(listener) {
    return this.pool.has(listener.getName());
  }

  list() {
    return this.pool;
  }
};

module.exports = new ListenerPool();