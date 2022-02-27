import redis from 'redis';

class Redis {
  constructor() {
    this.connected = false;
    this.client = null;
  }

  getConnection(host, port, db) {
    if (this.connected) return this.client;
    else {
      this.client = redis.createClient({
        host,
        port,
        db,
      });
      return this.client;
    }
  }
}

export default new Redis();
