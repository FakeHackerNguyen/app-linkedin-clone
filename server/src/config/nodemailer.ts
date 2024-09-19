import 'dotenv/config';
import nodemailer from 'nodemailer';

export default class Nodemailer {
  private transporter;

  constructor() {
    const USER = process.env.LOCAL_USERNAME as string;
    const PASS = process.env.LOCAL_PASSWORD as string;

    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: USER,
        pass: PASS,
      },
    });
  }

  public async sendMail(
    from: string,
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
