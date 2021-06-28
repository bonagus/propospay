import {
    SAVE_APPROVAL_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    users: [],
    selectedUser: null,
    works: [],
    approved: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_APPROVAL_SUCCESS:
            return { ...state, users: action.payload, approved: true };

        default:
            return state;
    }
};
