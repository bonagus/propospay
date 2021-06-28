import axios from 'axios';
import {
    SAVE_APPROVAL_SUCCESS
} from './types';

export const approveWork = (week, user) => {
    return (dispatch) => {
        const URL = `https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/${week}/users/${user}`;
        axios.get(URL)
            .then(response => {
                dispatch({ type: SAVE_APPROVAL_SUCCESS, payload: response.data });
            });
    };
};
