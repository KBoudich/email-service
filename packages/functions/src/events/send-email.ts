import { Emails } from "@email-service/core/email";
import { EventHandler } from "sst/node/event-bus";
import EmailService from "@email-service/core/emailService";
export const handler = EventHandler(Emails.Events.Send, async (evt) => {
  console.info("email sending requested", evt);

  const emailService = new EmailService();

  console.log("Sending email", evt.properties);

  await emailService.sendEmail(
    [evt.properties.to],
    evt.properties.from,
    evt.properties.emailType,
    evt.properties.subject,
    evt.properties.data
  );
  console.info("Email sent successfully via EmailService");
});
