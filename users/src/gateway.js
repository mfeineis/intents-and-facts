const Stream = require("most");
const { noop } = require("ramda");

const facts = {
    userCreated: (userId, meta) => ({
        meta,
        payload: {
            userId,
        },
        type: "fact/userCreated",
    }),
};

const intentTraps = {
    "intent/createUser": stateFact => intent => (
    ),
};

const intentUnknown = stateFact => intent => (
);



export const gateway = stateFact => intent => (
    (intentTraps[intent.type] || intentUnknown)(stateFact)(intent)
);
