import axios from 'axios';
import {
    FETCH_USERS_SUCCESS,
    USER_UPDATE,
    FETCH_USER_WORK,
    ADD_MONTH,
    SUB_MONTH
} from './types';

export const fetchAllUsers = () => {
    return (dispatch) => {
        const URL = 'https://timesheet-staging-aurity.herokuapp.com/api/users';
        axios.get(URL)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
                }
            });
    };
};

export const getCurrentUser = (userId, month) => {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE, payload: userId });
        const URL = `https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/${month}/2017/${userId}`;
        axios.get(URL)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: FETCH_USER_WORK, payload: response.data });
                }
            });
    };
};

export const addMonth = (userId, month) => {
    return (dispatch) => {
        dispatch({ type: ADD_MONTH, payload: month });
        getCurrentUser(userId, month);
    };
};

export const subMonth = (userId, month) => {
    return (dispatch) => {
        dispatch({ type: SUB_MONTH, payload: month });
        getCurrentUser(userId, month);
    };
};
