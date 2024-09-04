import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import * as Handlebars from "handlebars";
import fs from "fs";
import path from "path";

class EmailService {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({});
  }

  public async compileTemplate(
    templateName: string,
    data: any
  ): Promise<string> {
    const templatePath = path.join(
      process.cwd(),
      `templates/${templateName}.html`
    );
    const templateContent = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(templateContent);
    return template(data);
  }

  public async sendEmail(
    toAddress: string[],
    fromAddress: string,
    templateName: string,
    subject: string,
    data: any
  ): Promise<void> {
    const htmlBody = await this.compileTemplate(templateName, {
      ...data,
    });

    const sendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: toAddress,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: fromAddress,
    });

    try {
      await this.sesClient.send(sendEmailCommand);
      console.info("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

export default EmailService;
