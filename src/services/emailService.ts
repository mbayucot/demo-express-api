import path from "path";
import pug from "pug";
import { mailer } from "../lib/email";

export async function sendWelcomeEmail(to: string, name: string) {
    const html = pug.renderFile(
        path.join(__dirname, "../views/emails/welcome.pug"),
        { name },
    );

    await mailer.sendMail({
        from: '"Demo App" <no-reply@demo.com>',
        to,
        subject: "Welcome to Demo App!",
        html,
    });
}