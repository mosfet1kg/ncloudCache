const Redis = require('ioredis');
let redisClient = null;

module.exports = (function() {
  return {
    connect: () => {
      redisClient = new Redis({
        port: 32768
        // port: 6379,          // Redis port
        // host: 'redis-i578.cdb.ntruss.com',   // Redis host
      });
    },
    getRedisClient: () => {
      return redisClient;
    }
  }
})();
