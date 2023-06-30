const redis = require('redis');
const express = require('express')
const app = express()

app.use(express.json());

// const redisConn = async (url) => {
//     const client = redis.createClient({url: url});
//     client.on('connect', () => {
//         console.log('Redis client connected');
//     });

//     await client.connect();
//     console.log('connect done');
//     await client.set('k1', '123');
//     console.log('set done');
//     const value = await client.get('k1');
//     console.log('get done, value=', value);

//     await client.publish('myChannel', 'message123');

//     await client.disconnect();
//     console.log('disconnect done');
// }

const setRedis = async (url, key, val) => {
    const client = redis.createClient({url: url});
    client.on('connect', () => {
        console.log('Redis client connected');
    });

    await client.connect();
    await client.set(key, val);
    await client.disconnect();
}

const getRedis = async (url, key) => {
    const client = redis.createClient({url: url});
    client.on('connect', () => {
        console.log('Redis client connected');
    });

    await client.connect();
    return await client.get(key);
}


app.get('/healthCheck', (req, res) => {
    res.send('Hello, I am good!');
});

app.post('/testRedis', async (req, res) => {
    let payload = req.body;
    // console.log('payload=', payload);

    let url = payload.url;
    // redis://localhost:53001
    // redis://my-redis-cluster-not-clsmode.46vegk.ng.0001.use1.cache.amazonaws.com:6379
    // redis://my-redis-cluster-not-clsmode-001.46vegk.0001.use1.cache.amazonaws.com:6379
    // redis://my-redis-cluster-not-clsmode-002.46vegk.0001.use1.cache.amazonaws.com:6379

    try {
        if ("get" === payload.action) {
            let value = await getRedis(url, payload.key);
            res.send('OK to get: key=' + payload.key + ', value=' + value);
        } else if ("set" === payload.action) {
            await setRedis(url, payload.key, payload.value);
            res.send('OK to set: key=' + payload.key + ', value = ' + payload.value);
        } else if ("publish" === payload.action) {
            res.send('not impl');
        } else {
            res.send('NOT OK');
        }
    } catch (err) {
        res.send('ERROR: ' + err.message);
    }

});

const PORT = 80;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
