const uuid = require("uuid/v4");

const intents = require("./src/intents");
const { configurePortal } = require("./src/api");

const portal = configurePortal({
    timeoutMs: 1000,
});

portal.send(intents.createUser({
    userId: uuid(),
    userName: "Bob",
    hobbies: ["music", "ice-skating"],
})).catch(error => {
    console.error(error);
});
