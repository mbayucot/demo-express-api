// src/jobs/welcomeEmailJob.ts
import { Job } from "bullmq";
import { sendWelcomeEmail } from "../services/emailService";
import { createQueue, createWorker } from "../lib/queue";

export const welcomeEmailQueue = createQueue("welcomeEmail");

export async function enqueueWelcomeEmail(email: string, name: string) {
    await welcomeEmailQueue.add("send", { email, name }, {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
    });
}

export const welcomeEmailWorker = createWorker(
    "welcomeEmail",
    async (job: Job) => {
        const { email, name } = job.data;
        await sendWelcomeEmail(email, name);
    }
);