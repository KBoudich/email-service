import { SSTConfig } from "sst";
import { API } from "./stacks/api";
import { Events } from "./stacks/events";

export default {
  config(_input) {
    return {
      name: "email-service",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(Events).stack(API);
  },
} satisfies SSTConfig;
