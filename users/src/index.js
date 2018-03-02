import uuid from "uuid/v4";

import * as intents from "./intents";
import { configurePort } from "./services/gateway";

const port = configurePort({
    timeoutMs: 1000,
});

port.send(intents.createUser({
    userId: uuid(),
    userName: "Bob",
    hobbies: ["music", "ice-skating"],
})).catch(error => {
    console.error(error);
});
