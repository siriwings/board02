import authentication from './authentication';
import article from './article';
import board from './board';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication
    ,article
    ,board
});
