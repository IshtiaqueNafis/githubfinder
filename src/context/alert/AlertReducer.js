// eslint-disable-next-line no-unused-vars


import {REMOVE_ALERT, SET_ALERT} from "../../types";

const AlertReducer = (state, action) => {

    switch (action.type) {
        case SET_ALERT:
            return action.payload;
        case REMOVE_ALERT:
            return null;

        default:
            return state;
    }
};

export default AlertReducer;