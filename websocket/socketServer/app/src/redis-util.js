const redis = require('redis');

const getRedisClient = async (host, port) => {
    let redisClient = redis.createClient({url: `redis://${host}:${port}`});
    redisClient.on('connect', () => {
        console.log('Redis client connected');
    });

    await redisClient.connect();
    await redisClient.set('test', 'testInitSet');
    const value = await redisClient.get('test');
    console.log('test init: redis get, value=', value);
    //await redisClient.disconnect();

    return redisClient;
}

module.exports = { getRedisClient }
