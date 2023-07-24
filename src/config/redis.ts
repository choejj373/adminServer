import 'dotenv/config';
import redis from 'redis';
import { RedisClientType } from 'redis';

export let redisCli : RedisClientType; 

// export let redisClient : RedisClientType; 

export async function ConnectRedis(){
   redisCli = redis.createClient({
      url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
      legacyMode: true, // 반드시 설정 !!
   });

   redisCli.on('connect', () => {
      console.info('Redis connected!');
   });
  
   redisCli.on('error', (err:any) => {
      console.error('Redis Client Error', err);
   });
  
   redisCli.on('ready', () => {
      console.error('Redis Client is ready');
   });

   await redisCli.connect()

   //redisClient = redisCli.v4;
}

 //async/await이 잘 동작 되려면 꼭 필요(?)
// const redisCli = redisClient.v4;

