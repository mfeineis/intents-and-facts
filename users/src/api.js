const Stream = require("most");
const { includes, pathOr, pipe } = require("ramda");

const facts = require("./facts");
const intents = require("./intents");

const intentTraps = {
    "intent/createUser": (stateFact, intent) => (
        stateFact(facts.userCreated(intent))
    ),
    "intent/proposeMusicAsHobby": (stateFact, intent) => {
        // TODO: feature not implemented yet
    },
};

const intentUnknown = (stateFact, intent) => (
    stateFact(facts.unknownIntentTrapped(intent))
);

export const configurePortal = options => stateFact => intent => (
    (intentTraps[intent.type] || intentUnknown)(stateFact, intent)
);

const hasMusicAsHobby = pipe(
    pathOr([], ["payload", "hobbies"]),
    includes("music")
);

const pureStreamProcessor = (stateFact, stateIntent) => fact => {
    switch (fact.type) {
    case "fact/userCreated":
        if (!hasMusicAsHobby(fact)) {
            stateIntent(
                intents.proposeMusicAsHobby(fact)
            );
        }
    }
};
