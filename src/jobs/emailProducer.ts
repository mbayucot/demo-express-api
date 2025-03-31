import { emailQueue } from "../lib/queue";

export async function enqueueWelcomeEmail(to: string, name: string) {
    await emailQueue.add("welcomeEmail", { to, name });
}