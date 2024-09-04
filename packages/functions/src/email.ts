import { ApiHandler } from "sst/node/api";
import { Emails } from "@email-service/core/email";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const send: APIGatewayProxyHandlerV2 = async (event) => {
  const payload = JSON.parse(event.body || "{}");

  console.log("Sending email", payload);

  await Emails.SendEmail(
    payload.to,
    payload.from,
    payload.emailType,
    payload.subject,
    payload.data
  );

  return {
    statusCode: 200,
    body: "Email sent successfully",
  };
};
