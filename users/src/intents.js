import uuid from "uuid/v4";

const createUser = payload => ({
    meta: {
        correlationId: uuid(),
    },
    payload,
    type: "intent/createUser",
});

const proposeMusicAsHobby = ({ meta, payload }) => ({
    meta: {
        correlationId: meta.correlationId,
    },
    payload,
    type: "intent/proposeMusicAsHobby",
});

export {
    createUser,
    proposeMusicAsHobby,
};
