const uuid = require("uuid/v4");
const { map } = require("ramda");

const { configureGateway } = require("./src/gateway");

const intents = {
    createUser: userId => ({
        meta: {
            correlationId: uuid(),
        },
        payload: {
            userId,
        },
        type: "intent/createUser",
    }),
};

const gateway = configureGateway({
    timeoutMs: 1000,
});

gateway.send(intents.createUser("bob"))
    .catch(error => {
        console.error(error));
    });
