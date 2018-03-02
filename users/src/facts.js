
const musicAsHobbyStated = ({ payload, meta }) => ({
    meta: {
        correlationId: meta.correlationId,
    },
    payload,
    type: "fact/musicAsHobbyStated",
});

const unknownIntentTrapped = intent => ({
    meta: {
        correlationId: intent.meta.correlationId,
    },
    payload: intent,
    type: "fact/unknownIntentTrapped",
});

const userCreated = ({ payload, meta }) => ({
    meta: {
        correlationId: meta.correlationId,
    },
    payload,
    type: "fact/userCreated",
});

export {
    musicAsHobbyStated,
    unknownIntentTrapped,
    userCreated,
};
