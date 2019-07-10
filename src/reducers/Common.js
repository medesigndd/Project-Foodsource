import { STATUS_LOADING, STATUS_LOADED } from '../actions/types';

const INITIAL = { displayLoading: true };

export default (state = INITIAL, action) => {
    switch (action.type) {
        case STATUS_LOADING:
            return { ...state, displayLoading: true };
        case STATUS_LOADED:
            return { ...state, displayLoading: false };
        default:
            return state;
    }
}