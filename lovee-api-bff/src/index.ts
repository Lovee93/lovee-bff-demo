import express, { Express, NextFunction, Request, Response, response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();
const url = `redis://${process.env.REDISHOST}:${process.env.REDISPORT}` || 'redis://localhost:6379'
const redisClient = createClient({url})

const app: Express = express();
app.use(bodyParser.json());

export type Product = {
  skuId: number;
  skuName: string;
  skuImage: string;
  skuTheme: string;
  description: string;
  denominations?:Array<Denominations>
}

export type Inventory = {
  skuId: number;
  denomination: Array<Denominations>
}

export type Denominations = {
  stock: string,
  value: number
}

const expireCache = () => {
  const intervalId = setInterval(async () => {
    console.log("expire cache key");
    try {
      await redisClient.DEL("products")
    }
    catch { console.error }
  }, 10000);
}

// Healthcheck endpoint
app.get('/ping', async (req: Request, res: Response) => {
  res.send('pong');
});

app.get('/api/products', async (req: Request, res: Response) => {
  const cached_products = await redisClient.get('products')
  if(cached_products) {
    console.log("Cache Hit")
    res.send(JSON.parse(cached_products))
  }
  else {
    const products = await fetch("product service cloud function")
      .then(response => response.json())
      .then(data => data)
    const inventory = await fetch("inventory service cloud function")
      .then(response => response.json())
      .then(data => data)
    products.products.forEach((product:Product) => {
      const pi = inventory.find((p:Inventory) => p.skuId === product.skuId).denominations
      product.denominations = pi
    })
    await redisClient.set('products', JSON.stringify(products.products))
    console.log("Cache miss")
    res.send(products.products)
  }
});

app.post(
    '/hello',
    async (req: Request, res: Response) => {
      const name = req.body.name;
      res.statusCode = 200;
      res.send("Hello you, "+name);
    },
);

app.listen("3000", async () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:3000`,
    );
    try {
      await redisClient.connect()
      console.log("⚡️[server]: Connected to redis cache via cloud memorystore")
    }
    catch(error) {
      console.log("⚡️[server]: Error connecting to redis cache:", error)
    }
});

expireCache()