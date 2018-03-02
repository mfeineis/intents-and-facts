import { includes, pathOr, pipe } from "ramda";

import * as facts from "../facts";
import * as intents from "../intents";

const hasMusicAsHobby = pipe(
    pathOr([], ["payload", "hobbies"]),
    includes("music")
);

const musicSuggestions = (stateFact, stateIntent) => fact => {
    switch (fact.type) {
        case "fact/userCreated":
            if (!hasMusicAsHobby(fact)) {
                stateIntent(
                    intents.proposeMusicAsHobby(fact)
                );
            }
            break;
    }
};

export {
    musicSuggestions,
};
