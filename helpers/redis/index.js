const Redis = require('ioredis');
let redisClient = null;

const { ['REDIS_HOST']: host, ['REDIS_PORT']: port } = process.env;

module.exports = (function() {
  return {
    connect: () => {
      redisClient = new Redis({
        host,
        port
      });
    },
    getRedisClient: () => {
      return redisClient;
    }
  }
})();
