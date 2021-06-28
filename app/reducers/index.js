import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ApprovalReducer from './ApprovalReducer';

export default combineReducers({
    users: UserReducer,
    approval: ApprovalReducer
});
