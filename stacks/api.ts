import { StackContext, Api, EventBus, use } from "sst/constructs";
import { Events } from "./events";
export function API({ stack }: StackContext) {
  const { bus } = use(Events);
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "POST /invite": "packages/functions/src/email.send",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
