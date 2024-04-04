import express, { Request, Response } from 'express';
import Redis from 'ioredis';
const app = express();

const port: number = 4000;
const redisUrl: string = "redis://127.0.0.1:6379";
const client = new Redis(redisUrl);

app.use(express.json());
app.post('/', async (req: Request, res: Response) => {
    const { key, value }: { key: string, value: string } = req.body;
    const response = await client.set(key, value)
    res.json(response)
});
app.get("/", (req: Request, res: Response) => {
    const { key }: { key: string } = req.body
    client.get(key, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: err.message });
        } else {
            console.log(result)
            res.json(result);
        }
    });
})
app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
