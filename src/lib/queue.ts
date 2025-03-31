// src/lib/queue.ts
import { Queue, Worker, QueueOptions, WorkerOptions } from "bullmq";
import IORedis from "ioredis";

const redisOptions = {
    connection: new IORedis(process.env.REDIS_URL || "redis://localhost:6379"),
};

export function createQueue(name: string, options: QueueOptions = {}) {
    return new Queue(name, { ...options, ...redisOptions });
}

export function createWorker<T = any>(
    name: string,
    processor: WorkerOptions<T>["processor"],
    options: WorkerOptions = {}
) {
    return new Worker(name, processor, { ...options, ...redisOptions });
}