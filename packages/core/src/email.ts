export * as Emails from "./email";
import { z } from "zod";

import { event } from "./event";

export const Events = {
  Send: event(
    "send.email",
    z.object({
      to: z.string(),
      from: z.string(),
      emailType: z.string(),
      subject: z.string(),
      data: z.any(),
    })
  ),
};

export async function SendEmail(
  to: string,
  from: string,
  emailType: string,
  subject: string,
  data: any
) {
  await Events.Send.publish({
    to,
    from,
    emailType,
    subject,
    data,
  });
}
