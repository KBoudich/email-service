import { createEventBuilder, ZodValidator } from "sst/node/event-bus";

export const event = createEventBuilder({
  bus: "event-bus",
  validator: ZodValidator,
});
