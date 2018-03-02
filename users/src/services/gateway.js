import Stream from "most";

import * as facts from "../facts";
import * as intents from "../intents";

const intentTraps = {
    "intent/createUser": stateFact => intent => (
        stateFact(facts.userCreated(intent))
    ),
    "intent/proposeMusicAsHobby": stateFact => intent => {
        // TODO: feature not implemented yet
    },
};

const intentUnknown = stateFact => intent => (
    stateFact(facts.unknownIntentTrapped(intent))
);

const configurePort = options => stateFact => intent => (
    (intentTraps[intent.type] || intentUnknown)(stateFact)(intent)
);

export {
    configurePort,
};