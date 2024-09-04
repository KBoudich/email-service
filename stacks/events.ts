import { EventBus, StackContext } from "sst/constructs";

export function Events({ stack }: StackContext) {
  const bus = new EventBus(stack, "event-bus", {
    defaults: {
      retries: 0,
    },
  });

  bus.subscribe("send.email", {
    handler: "packages/functions/src/events/send-email.handler",
    logRetention: "one_day",
    copyFiles: [{ from: "templates", to: "templates" }],
    permissions: ["ses"],
  });

  return { bus };
}
